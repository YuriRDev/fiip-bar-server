import { Request, Response } from 'express'
import { getRepository } from 'typeorm';

import Host from '../models/Host'

import jwt from 'jsonwebtoken'

import secret from '../../secret';
import axios from 'axios';
import Bars from '../models/Bars';
import Items from '../models/Items';
import Categorias from '../models/Categorias';

import { validate } from 'uuid'

class ItemController {
  async create(req: Request, res: Response) {
    const id = req.userId;

    const { barId, name, description, price, photo_url, categoriaId } = req.body;

    if (!barId || !name || !price || !categoriaId) {
      return res.status(505).json({
        error: 'Missing params'
      })
    } else {

      const barRepo = getRepository(Bars)
      try {
        const bar = await barRepo.findOne({
          where: { id: barId }
        })

        if (bar) {

          const hostRepo = getRepository(Host)
          const host = await hostRepo.findOne({
            where: { id }
          })

          if (bar.host.id == host?.id) {
            const itemRepo = getRepository(Items)
            const item = new Items()

            let dataAgora = new Date()
            let timezone = dataAgora.getTimezoneOffset()

            // timezone brasil = 180 
            if (timezone != 180) {
              let b = 180 - timezone;
              dataAgora.setMinutes(dataAgora.getMinutes() - b);
            }

            try {
              const categoriaRepo = getRepository(Categorias)
              const categoria = await categoriaRepo.findOne({
                where: { id: categoriaId }
              })


              const itemsLength = await itemRepo.find({
                where: { categoria }
              })

              console.log(itemsLength.length)

              if (categoria) {
                if (categoria.bar.host.id == host.id) {
                  item.active = true;
                  item.bar = bar;
                  item.created_at = dataAgora;
                  item.photo_url = photo_url;
                  item.description = description;
                  item.name = name;
                  item.price = price;
                  item.categoria = categoria;
                  item.index = Number(itemsLength.length)

                  await itemRepo.save(item)

                  return res.json({
                    created: true,
                    id: item.id,
                    name: item.name,
                    created_at: item.created_at,
                    price: item.price,
                    photo_url: item.photo_url
                  })
                } else {
                  return res.status(403).json({
                    error: 'you are not the host for this category'
                  })
                }

              } else {
                return res.status(404).json({
                  error: 'Invalid Categoria Id!'
                })
              }
            } catch (err) {
              return res.status(404).json({
                error: 'Invalid Categoria Id!'
              })
            }

          } else {
            return res.status(403).json({
              error: 'You are not the host for this bar!'
            })
          }


        } else {
          return res.status(505).json({
            error: 'invalid BarId!'
          })
        }

      } catch (err) {
        return res.status(505).json({
          error: 'invalid BarId!'
        })
      }


    }

  }

  async listById(req: Request, res: Response) {
    const { barId } = req.body;

    const barRepo = getRepository(Bars)
    try {
      const bar = await barRepo.findOne({
        where: { id: barId }
      })

      if (bar) {
        const itemsRepo = getRepository(Items)
        const items = await itemsRepo.find({
          where: { bar }
        })

        // listar categorias
        let itemsOrdem: any = []
        items.map((item: any) => {
          itemsOrdem[item.categoria.index] = {
            categoriaId: item.categoria.id,
            categoria: item.categoria.name,
            items: []
          }
        })

        // adicionar items na categoria
        itemsOrdem.map((item: any, index: number) => {
          let itemsAdicionados: any = []
          items.map((itemzinho: any) => {
            if (itemzinho.categoria.id == item.categoriaId) {
              itemsAdicionados.push({
                id: itemzinho.id,
                name: itemzinho.name,
                description: itemzinho.description,
                price: itemzinho.price,
                photo_url: itemzinho.photo_url,
                active: itemzinho.active,
                index: itemzinho.index,
                categoria: itemzinho.categoria.id
              })
            }
          })
          itemsAdicionados.sort((a: any, b: any) => (a.index > b.index) ? 1 : -1)
          itemsOrdem[index].items = itemsAdicionados
        })

        let itemsCompensados: any = []
        itemsOrdem.map((item: any) => {
          itemsCompensados.push(item)
        })


        return res.json(itemsCompensados)

      } else {
        return res.status(404).json({
          error: 'Bar Not Found!'
        })
      }

    } catch (err) {
      console.log(err)
      return res.status(404).json({
        error: 'Bar Not Found!'
      })
    }

  }

  async editById(req: Request, res: Response) {
    const id = req.userId;
    const { itemId, barId, name, description, price, categoriaId, photo_url } = req.body;

    if (!itemId || !barId || !name || !price || !categoriaId) {
      return res.status(503).json({
        error: 'Missing params!'
      })
    } else {
      // possui todas as informacoes basicas, agora eh ver se o barId, categoriaId e o itemId sao UUIDV4
      if (typeof (price) == 'number') {
        if (validate(itemId)) {
          if (validate(barId)) {
            if (validate(categoriaId)) {
              // tudo validado, agora eh ver se eh o dono do evento
              const barRepo = getRepository(Bars)
              const barAchado = await barRepo.findOne({
                where: { id: barId }
              })

              if (barAchado) {
                // verificar se eh o dono do evento
                if (barAchado.host.id == id) {
                  // verificar se eh o dono da categoria
                  const categoryRepo = getRepository(Categorias)
                  const categoriaAchada = await categoryRepo.findOne({
                    where: { id: categoriaId }
                  })

                  if (categoriaAchada) {
                    if (categoriaAchada.bar.id == barAchado.id) {
                      // eh o dono da categoria

                      //verificar se eh o dono do item agora

                      const itemRepo = getRepository(Items)
                      const itemAchado = await itemRepo.findOne({
                        where: { id: itemId }
                      })
                      if (itemAchado) {
                        if (itemAchado.categoria.bar.id == barAchado.id) {
                          // tudo validado perfeitamente!

                          // agora eh so editar os parametros novos!

                          itemAchado.name = name;
                          itemAchado.description = description;
                          itemAchado.price = price;
                          itemAchado.categoria = categoriaAchada;
                          itemAchado.photo_url = photo_url;

                          await itemRepo.save(itemAchado)
                          return res.json({
                            id: itemAchado.id,
                            name: itemAchado.name,
                            description: itemAchado.description,
                            price: itemAchado.price,
                            categoria: itemAchado.categoria.id,
                            photo_url: itemAchado.photo_url
                          })


                        } else {
                          return res.status(403).json({
                            error: 'You are not the host for this item!'
                          })
                        }

                      } else {
                        return res.status(404).json({
                          error: 'ItemId not found'
                        })
                      }

                    } else {
                      return res.status(403).json({
                        error: 'You are not the host for this category'
                      })
                    }
                  } else {
                    return res.status(404).json({
                      error: 'categoriaId not found'
                    })
                  }
                } else {
                  return res.status(403).json({
                    error: 'You are not the host for this event'
                  })
                }
              } else {
                return res.status(404).json({
                  error: 'BarId not found!'
                })
              }
            } else {
              return res.status(403).json({
                error: 'Invalid categoriaId format, must be a uuid'
              })
            }
          } else {
            return res.status(403).json({
              error: 'Invalid barId format, must be a uuid'
            })
          }
        } else {
          return res.status(403).json({
            error: 'Invalid itemId format, must be a uuid'
          })
        }
      } else {
        return res.status(503).json({
          error: 'Price must be a number'
        })
      }
    }



  }

  async delete(req: Request, res: Response) {
    const id = req.userId;
    const { itemId } = req.body;

    if (itemId) {
      if (validate(itemId)) {
        const itemRepo = getRepository(Items)
        const itemAchado = await itemRepo.findOne({
          where: { id: itemId }
        })

        if (itemAchado) {
          if (itemAchado.categoria.bar.host.id == id) {
            itemRepo.delete(itemAchado)
            return res.json({
              deleted: true
            })
          } else {
            return res.status(503).json({
              error: 'You are not the host for this item!'
            })
          }
        } else {
          return res.status(404).json({
            error: 'Item not found!'
          })
        }
      } else {
        return res.status(503).json({
          error: 'ItemId must be a uuid'
        })
      }
    } else {
      return res.status(503).json({
        error: 'Missing Params'
      })
    }
  }

  async indexOrder(req: Request, res: Response) {
    const id = req.userId;
    const { itemsIndex, categoryId } = req.body;

    if (!itemsIndex || !categoryId) {
      return res.json(504).json({
        error: 'Missing params'
      })
    } else {
      if (validate(categoryId)) {
        // ver se bar existe
        const categoryRepo = getRepository(Categorias)
        const categoriaAchada = await categoryRepo.findOne({
          where: { id: categoryId }
        })

        if (categoriaAchada) {
          if (categoriaAchada.bar.host.id == id) {
            // pegar length dos items dessa categoria
            const itemsRepo = getRepository(Items)
            const itemsAchados = await itemsRepo.find({
              where: { categoria: { id: categoryId } }
            })

            if (Array.isArray(itemsIndex)) {
              if (itemsIndex.length == itemsAchados.length) {
                // verificar se todos os items existem e pertencem a mesma categoria
                let isTheSameCategory = true
                Promise.all(
                  itemsIndex.map(async (item: string) => {
                    const itemDoMap = await itemsRepo.findOne({ where: { id: item } })
                    if (itemDoMap?.categoria.id != categoryId) {
                      isTheSameCategory = false
                    }
                  })
                ).then(() => {
                  if (isTheSameCategory) {
                    // agora eh so salvar de acordo com o novo index!!!
                    Promise.all(
                      itemsIndex.map(async (item: string, index: number) => {
                        const itemDoMap = await itemsRepo.findOne({ where: { id: item } })
                        if(itemDoMap){
                          itemDoMap.index = index;
                          await itemsRepo.save(itemDoMap)
                        }
                      })
                    ).then(() => {
                      return res.json({
                        ok: true
                      })
                    }).catch(() => {
                      return res.status(503).json({
                        error: 'Error desconhecido!'
                      })
                    })

                  } else {
                    return res.status(503).json({
                      error: 'One/+ of the itens does not exist or does not pertence to the same category'
                    })
                  }
                })


              } else {
                return res.status(504).json({
                  error: 'ItemsIndex must be the same length as the categoryItems!'
                })
              }

            } else {
              return res.status(504).json({
                error: 'ItemsIndex must be array'
              })
            }

          } else {
            return res.status(403).json({
              error: 'You are not the host for this category'
            })
          }
        } else {
          return res.status(404).json({
            error: 'categoria not found!'
          })
        }



      } else {
        return res.status(504).json({
          error: 'categoryId must be a uuid'
        })
      }
    }

  }


}

export default new ItemController();