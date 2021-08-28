import { json, Request, Response } from 'express'
import { getRepository } from 'typeorm';

import Host from '../models/Host'

import jwt from 'jsonwebtoken'

import secret from '../../secret';
import axios from 'axios';
import Bars from '../models/Bars';
import Items from '../models/Items';
import Categorias from '../models/Categorias';

import { validate } from 'uuid'

class CategoriaController {
  async create(req: Request, res: Response) {
    const id = req.userId;

    const { barId, name } = req.body;

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

        if (host?.id == bar?.host.id) {
          // pegar quantidade de categorias que o bar tem
          const categoriasRepo = getRepository(Categorias)
          const categorias = await categoriasRepo.find({
            where: { bar: bar }
          })

          console.log(categorias.length)

          const categoria = new Categorias()
          categoria.name = name;
          categoria.bar = bar;
          categoria.index = categorias.length

          await categoriasRepo.save(categoria)

          return res.json({
            id: categoria.id,
            name: categoria.name,
            index: categoria.index
          })

        } else {
          return res.status(403).json({
            error: 'You are not the host for this bar'
          })
        }
      } else {
        return res.status(404).json({
          error: 'Bar not found'
        })
      }
    } catch {
      return res.status(404).json({
        error: 'Bar not found'
      })
    }


  }

  async list(req: Request, res: Response) {
    const id = req.userId;
    const { barId } = req.body;

    const barRepo = getRepository(Bars)
    try {
      const bar = await barRepo.findOne({
        where: { id: barId }
      })

      if (bar) {
        if (bar.host.id == id) {
          console.log("eh o host!")
          const categoriaRepo = getRepository(Categorias)
          const categorias = await categoriaRepo.find({
            where: { bar: bar }, select: ['id', 'name', 'index']
          })

          // listando a quantidade de items que tem na categoria
          categorias.sort((a: any, b: any) => (a.index > b.index) ? 1 : -1)

          // mandar um promise all aqui pra listar o length dos items tambem
          let categoriaTotal: any = []
          const getInfo = () => {
            return (
              Promise.all(
                categorias.map(async (item: any) => {
                  const itemRepo = getRepository(Items)
                  const items = await itemRepo.find({
                    where: { categoria: { id: item.id }}
                  })
                  categoriaTotal.push({
                    id: item.id,
                    name: item.name,
                    index: item.index,
                    items: items.length,
                  })

                })
              )
            )
          }



          getInfo().then(() => {
            categoriaTotal.sort((a: any, b: any) => (a.index > b.index) ? 1 : -1)
            return res.json(categoriaTotal)
          }).catch(() => {
            return res.status(505).json({
              error: "Error Inesperado listando categorias"
            })
          })


        } else {
          return res.status(403).json({
            error: 'You are not the host for this bar!'
          })
        }
      } else {
        return res.status(404).json({
          error: 'Invalid Bar Id!'
        })
      }
    } catch {
      return res.status(404).json({
        error: 'Invalid Bar Id!'
      })
    }

  }

  async changeIndex(req: Request, res: Response) {
    const id = req.userId;
    const { barId, categoriasIndex } = req.body;

    const barRepo = getRepository(Bars)
    try {
      const bar = await barRepo.findOne({
        where: { id: barId }
      })

      if (bar) {
        if (bar.host.id == id) {
          console.log("eh o host!")
          const categoriaRepo = getRepository(Categorias)
          const categorias = await categoriaRepo.find({
            where: { bar: bar }, select: ['id', 'name', 'index']
          })

          const lengthTotal = categorias.length;

          if (Array.isArray(categoriasIndex)) {

            // verificar se todos sao uuid
            let todosSaoUuid = true;

            categoriasIndex.map((item: any) => {
              if (!validate(item)) {
                todosSaoUuid = false
              }
            })
            if (todosSaoUuid) {


              if (categoriasIndex.length == lengthTotal) {
                let ehHostDeCadaItem = true;
                const categoriaRepo = getRepository(Categorias)
                Promise.all(
                  categoriasIndex.map(async (item: any) => {
                    const categoriaAchada = await categoriaRepo.findOne({
                      where: { id: item }
                    })

                    if (categoriaAchada?.bar.host.id != id) {
                      ehHostDeCadaItem = false
                    }
                  })
                ).then(async () => {
                  if (ehHostDeCadaItem) {
                    // agora eh setar o novo array 
                    Promise.all(
                      categoriasIndex.map(async (item: string, index: number) => {
                        const categoriaAchada = await categoriaRepo.findOne({
                          where: { id: item }
                        })
                        if (categoriaAchada) {
                          categoriaAchada.index = index;
                          await categoriaRepo.save(categoriaAchada)
                        }
                      })
                    ).then(() => {
                      return res.json({
                        updated: true
                      })
                    }).catch(() => {
                      return res.status(503).json({
                        error: 'Error desconhecido'
                      })
                    })
                  } else {
                    return res.status(403).json({
                      error: 'You are not the host for one/more categories'
                    })
                  }

                }).catch(() => {
                  return res.status(503).json({
                    error: 'Error desconhecido'
                  })
                })
              } else {
                return res.status(500).json({
                  error: 'Length must be the same at categories length'
                })
              }


            } else {
              res.status(500).json({
                error: 'CategoriasIndex must be array of UUID'
              })
            }

          } else {
            return res.status(503).json({
              error: "categoriasIndex must be array"
            })
          }

          // agora pegar a lista de categorias e ver se realmente tem o mesmo length

        } else {
          return res.status(403).json({
            error: 'You are not the host for this bar!'
          })
        }
      } else {
        return res.status(404).json({
          error: 'Invalid Bar Id!'
        })
      }
    } catch {
      return res.status(404).json({
        error: 'Invalid Bar Id!'
      })
    }

  }

  async delete(req: Request, res: Response) {
    const id = req.userId;
    const { categoryId } = req.body;


    try {
      const categoryRepo = getRepository(Categorias)
      if (validate(categoryId)) {
        const categoria = await categoryRepo.findOne({
          where: { id: categoryId }
        })

        if (categoria) {
          if (categoria.bar.host.id == id) {
            // pegar lista de items que tem essa categoria
            const itemsRepo = getRepository(Items)
            const itemsAchados = await itemsRepo.find({
              where: { categoria: categoria }
            })

            if (itemsAchados.length == 0) {
              console.log("ok, deletando...")
              await categoryRepo.delete(categoria)
              return res.json({
                deleted: true
              })
            } else {
              console.log("deletando todos os lenghts")
              Promise.all(
                itemsAchados.map((item: any) => {
                  itemsRepo.delete(item)
                })
              ).then(async () => {
                await categoryRepo.delete(categoria)
                return res.json({
                  deleted: true
                })
              }).catch(() => {
                console.log("error desconhecido!")
              })
            }

          } else {
            return res.status(403).json({
              error: 'You are not the host for this category'
            })
          }
        } else {
          return res.status(404).json({
            error: 'Invalid Category'
          })
        }

      } else {
        return res.status(504).json({
          error: 'CategoryId must be a UUID'
        })
      }


    } catch {
      return res.status(404).json({
        error: 'Invalid Bar Id!'
      })
    }

  }
}

export default new CategoriaController();