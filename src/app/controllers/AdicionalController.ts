import e, { Request, Response } from 'express'
import { getRepository, IsNull, Not } from 'typeorm';

import Host from '../models/Host'

import jwt from 'jsonwebtoken'

import secret from '../../secret';
import axios from 'axios';
import Bars from '../models/Bars';
import Items from '../models/Items';
import Categorias from '../models/Categorias';

import { validate } from 'uuid'
import Adicionais from '../models/Adicionais';

class AdicionalController {
  async create(req: Request, res: Response) {
    const id = req.userId;

    const { name, price, items } = req.body;

    if (name && price && items) {
      // verificar se o ID eh um host e possui eventos

      const hostRepo = getRepository(Host)
      const host = await hostRepo.findOne({
        where: { id }
      })

      if (host) {
        const barRepo = getRepository(Bars)
        const bar = await barRepo.findOne({
          where: { host }
        })

        if (bar) {
          // agora pegar a lista de items e verificar se todos sao UUID
          if (Array.isArray(items) && Number(price) >= 0) {

            let allUuid = true
            // verificar se todos os items sao UUID
            items.map((item: string) => {
              if (validate(item)) {

              } else {
                allUuid = false
              }
            })

            if (allUuid) {
              // agora verificar se os items passados pelo host existem e sao do mesmo host

              const itemRepo = getRepository(Items)
              let isEveryBar = true
              Promise.all(
                items.map(async (item: any) => {
                  const itemAchado = await itemRepo.findOne({
                    where: { id: item, bar }
                  })

                  if (!itemAchado) {
                    isEveryBar = false
                  }


                })
              ).then(async () => {
                if (isEveryBar) {
                  // ok, entao todos os itens SAO validos, agora eh so criar a tabela nova dos adicionais e adicionar nos items!
                  const adicionaisRepo = getRepository(Adicionais)
                  const adicional = new Adicionais

                  let dataAgora = new Date()
                  let timezone = dataAgora.getTimezoneOffset()

                  // timezone brasil = 180 
                  if (timezone != 180) {
                    let b = 180 - timezone;
                    dataAgora.setMinutes(dataAgora.getMinutes() - b);
                  }

                  adicional.created_at = dataAgora
                  adicional.price = Number(price)
                  adicional.name = String(name)
                  adicional.bar = bar

                  await adicionaisRepo.save(adicional)

                  const adicionalId = adicional.id;

                  // agora pegar os IDS do item 

                  Promise.all(
                    items.map(async (itemzinho: any) => {
                      const item = await itemRepo.findOne({
                        where: { id: itemzinho }
                      })

                      if (item) {
                        if (item.adicionais) {
                          let arrayNovo = JSON.parse(item.adicionais)
                          arrayNovo.push(adicionalId)
                          item.adicionais = JSON.stringify(arrayNovo);
                          await itemRepo.save(item)
                        } else {
                          let arrayNovo = [adicionalId]
                          item.adicionais = JSON.stringify(arrayNovo)
                          await itemRepo.save(item)
                        }
                      }

                    })
                  ).then(() => {
                    return res.json({
                      ok: adicionalId
                    })
                  })





                } else {
                  return res.status(404).json({
                    error: 'Item ID not found!'
                  })
                }
              }).catch((err: any) => {
                console.log(err)
                return res.status(505).json({
                  error: 'Internal server error ??'
                })
              })

            } else {
              return res.status(503).json({
                error: 'Items must be an array of UUID!'
              })
            }

          } else {
            return res.status(503).json({
              error: 'Items must be array, price must be a number >= 0 '
            })
          }
        } else {
          return res.status(404).json({
            error: 'You have 0 bar!'
          })
        }


      } else {
        return res.status(403).json({
          error: 'You are not a host'
        })
      }

    } else {
      return res.status(503).json({
        error: 'Missing params'
      })
    }


  }

  async list(req: Request, res: Response) {
    const id = req.userId

    const hostRepo = getRepository(Host)
    const host = await hostRepo.findOne({
      where: { id }
    })

    if (host) {
      const barRepo = getRepository(Bars)
      const bar = await barRepo.findOne({
        where: { host }
      })

      if (bar) {
        const adicionaisRepo = getRepository(Adicionais)
        const adicionais = await adicionaisRepo.find({
          where: { bar }
        })

        let adicionaisArray: any = []

        adicionais.map((item: any) => {
          adicionaisArray.push({
            id: item.id,
            name: item.name,
            price: item.price,
            items: []
          })
        })

        const itemRepo = getRepository(Items)
        const itemsComAdicionais = await itemRepo.find({
          where: { adicionais: Not(IsNull) }
        })

        // fazer array nos adicionais e dentro os items, e colocar os itens no novo array de adicional
        adicionaisArray.map((item: any, index: number) => {
          itemsComAdicionais.map((itemzinho: any) => {
            (JSON.parse(itemzinho.adicionais)).map((itemadicional: any) => {
              if (itemadicional == item.id) {
                adicionaisArray[index].items.push({
                  id: itemzinho.id,
                  name: itemzinho.name
                })
              }
            })
          })
        })





        return res.json(adicionaisArray)

      } else {
        return res.status(404).json({
          error: 'You have 0 bar'
        })
      }
    } else {
      return res.status(403).json({
        error: 'You are not a host!'
      })
    }


  }

  async delete(req: Request, res: Response) {
    const id = req.userId

    const { adicionalId } = req.body;

    const hostRepo = getRepository(Host)
    const host = await hostRepo.findOne({
      where: { id }
    })

    if (host) {
      const barRepo = getRepository(Bars)
      const bar = await barRepo.findOne({
        where: { host }
      })

      if (bar) {
        // achar o adicional ID
        if (adicionalId) {
          if (validate(adicionalId)) {
            const adicionalRepo = getRepository(Adicionais)
            const adicional = await adicionalRepo.findOne({
              where: { id: adicionalId, bar: bar },
            })

            if (adicional) {
              //achou o adicional, agora eh pegar toda a lista de items e remover o adicional de todos
              const itemRepo = getRepository(Items)
              const items = await itemRepo.find({
                where: { bar: bar, adicionais: Not(IsNull()) }
              })

              Promise.all(
                items.map(async (item: any) => {
                  let adicionadosArray = JSON.parse(item.adicionais)
                  JSON.parse(item.adicionais).map((adicionalAchado: string, index: number) => {
                    if (adicionalAchado == adicionalId) {
                      console.log("achou esse adicionado no item, index ", index)
                      adicionadosArray.splice(index, 1)
                    }
                  })

                  item.adicionais = JSON.stringify(adicionadosArray)
                  await itemRepo.save(item)
                })
              ).then(async () => {
                console.log("adicionais removidos dos items!")
                await adicionalRepo.delete(adicional)

                return res.json({
                  removed: true
                })

              })



            } else {
              return res.status(404).json({
                error: 'Adicional not found!'
              })
            }
          } else {
            return res.status(503).json({
              error: 'AdicionalID MUST BE UUID'
            })
          }
        } else {
          return res.status(503).json({
            error: 'missing AdicionalId'
          })
        }


      } else {
        return res.status(403).json({
          error: 'You have no bar!'
        })
      }
    } else {
      return res.status(403).json({
        error: 'You are not a host!'
      })
    }


  }

  async edit(req: Request, res: Response) {
    const id = req.userId;

    const { adicionalId, name, price, items } = req.body;

    if (name && Number(price) >= 0 && Array.isArray(items) && validate(adicionalId)) {
      const hostRepo = getRepository(Host)
      const host = await hostRepo.findOne({
        where: { id }
      })

      if (host) {
        const barRepo = getRepository(Bars)
        const bar = await barRepo.findOne({
          where: { host: host }
        })

        if (bar) {
          const adicionalRepo = getRepository(Adicionais)
          const adicional = await adicionalRepo.findOne({
            where: { id: adicionalId, bar: bar }
          })

          if (adicional) {
            // agora pegar o adicional e passar as novas propriedades pra ele
            adicional.name = String(name)
            adicional.price = Number(price)

            await adicionalRepo.save(adicional)

            // pegar a lista de items e remover todos que tem, pra depois adicionar de novo!
            const itemRepo = getRepository(Items)
            const itemsTotal = await itemRepo.find({
              where: { bar: bar, adicionais: Not(IsNull()) }
            })

            Promise.all(
              itemsTotal.map(async (item: any) => {
                let adicionadosArray = JSON.parse(item.adicionais)
                console.log("item achado!!")
                JSON.parse(item.adicionais).map((adicionalAchado: string, index: number) => {
                  if (adicionalAchado == adicionalId) {
                    adicionadosArray.splice(index, 1)
                  }
                })


                if (adicionadosArray.length) {
                  console.log('tem length!')
                  if (adicionadosArray.length > 0) {
                    item.adicionais = JSON.stringify(adicionadosArray)
                    await itemRepo.save(item)
                  } else {
                    item.adicionais = null
                    await itemRepo.save(item)
                  }
                } else {
                  item.adicionais = null
                  await itemRepo.save(item)
                }

              })
            ).then(() => {
              Promise.all(
                items.map(async (item: any) => {
                  if (validate(id)) {
                    const itemAchado = await itemRepo.findOne({
                      where: { id: item, bar: bar }
                    })
                    if (itemAchado) {
                      console.log("tiem achado aqui!")
                      if ((itemAchado.adicionais)) {
                        console.log("tem length")
                        if (JSON.parse(itemAchado.adicionais).length > 0) {
                          let adicionaisDoItem = JSON.parse(itemAchado.adicionais)
                          adicionaisDoItem.push(adicionalId)
                          itemAchado.adicionais = JSON.stringify(adicionaisDoItem)
                          await itemRepo.save(itemAchado)
                        } else {
                          itemAchado.adicionais = JSON.stringify([adicionalId])
                          await itemRepo.save(itemAchado)
                        }
                      } else {
                        itemAchado.adicionais = JSON.stringify([adicionalId])
                        await itemRepo.save(itemAchado)
                      }

                    }
                  }
                })
              ).then(() => {
                // agora os items novos devem estar funcinando!

                return res.json({
                  edited: true
                })
              })



            })



          } else {
            return res.status(404).json({
              error: 'Adicional does not exist!'
            })
          }



        } else {
          return res.status(403).json({
            error: 'You have 0 bar!'
          })
        }
      } else {
        return res.status(403).json({
          error: 'You are not a host!'
        })
      }
    } else {
      return res.status(503).json({
        error: "Name must be a string, Price must be Number >= 0, Items must be an array, adicionalId must be UUID!"
      })
    }

  }


}

export default new AdicionalController();