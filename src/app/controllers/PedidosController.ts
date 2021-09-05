import { json, Request, Response } from 'express'
import { getRepository, MoreThan, Not } from 'typeorm';


import secret from '../../secret';
import axios from 'axios';
import Bars from '../models/Bars';
import Items from '../models/Items';
import Categorias from '../models/Categorias';

import { validate } from 'uuid'
import Sessions from '../models/Sessions';
import Pedidos from '../models/Pedidos';
import Host from '../models/Host';

class PedidosController {
  async create(req: Request, res: Response) {
    let id = req.userId;

    const { nome, telefone, paymentMethod, troco, carrinho, barId, mesa } = req.body;

    // verificar se o ID eh valido

    const sessionRepo = getRepository(Sessions)
    const session = await sessionRepo.findOne({
      where: { id }
    })

    if (session) {
      if (nome && telefone && paymentMethod && carrinho && barId) {
        // verificar nome, telefone, paymentMethod
        console.log('>>>.', paymentMethod)
        if (nome.length > 3) {
          if (telefone.length == 11) {
            if (Number(paymentMethod) >= 0 || Number(paymentMethod) <= 3) {
              // agora verificar o array de carrinho!
              if (Array.isArray(carrinho)) {
                // agora verificar se os itens do carrinho existem e sao UUID!

                let isCarrinhoItemsValid = true;
                const itemRepo = getRepository(Items)

                let CarrinhoFinal: any = []

                const barRepo = getRepository(Bars)
                const bar = await barRepo.findOne({
                  where: { id: barId }
                })


                if (bar) {
                  if (bar.active) {

                    Promise.all(
                      carrinho.map(async (item: any) => {
                        if (validate(item.id)) {
                          const itemAchado = await itemRepo.findOne({ where: { id: item.id } })
                          if (itemAchado && itemAchado.categoria.bar.id == barId) {
                            // itemName, price, obs, categoria
                            CarrinhoFinal.push({
                              name: itemAchado.name,
                              quantity: item.quantity,
                              price: itemAchado.price,
                              obs: item.obs
                            })

                          } else {
                            isCarrinhoItemsValid = false;
                          }
                        } else {
                          isCarrinhoItemsValid = false
                        }
                      })
                    ).then(() => {
                      if (isCarrinhoItemsValid) {

                        const pedidosRepo = getRepository(Pedidos)
                        const novoPedido = new Pedidos()

                        let dataAgora = new Date()
                        let timezone = dataAgora.getTimezoneOffset()

                        // timezone brasil = 180 
                        if (timezone != 180) {
                          let b = 180 - timezone;
                          dataAgora.setMinutes(dataAgora.getMinutes() - b);
                        }
                        // Agora salvar no DB : 
                        // bar 
                        // sessionId, 
                        // mesa = null 
                        // name
                        // phone 
                        // items 
                        // created_At = agora
                        // payment 0,1,2
                        // troco = payment == 0 ? troco : null

                        let mesaEscolhida = null

                        if (bar.mesas != null) {

                          if (mesa > 0) {
                            mesaEscolhida = mesa

                            novoPedido.bar = bar;
                            novoPedido.session = session;
                            novoPedido.mesa = mesaEscolhida;
                            novoPedido.name = nome;
                            novoPedido.phone = telefone;
                            novoPedido.items = JSON.stringify(CarrinhoFinal);
                            novoPedido.created_at = dataAgora;
                            novoPedido.payment = Number(paymentMethod) == 0 ? 'Dinheiro' : Number(paymentMethod) == 1 ? 'Credito' : 'Debito';
                            novoPedido.troco = Number(paymentMethod) == 0 ? troco >= 1 ? troco : null : null
                            novoPedido.status = 0;

                            pedidosRepo.save(novoPedido)
                          } else {
                            return res.status(403).json({
                              error: 'Missing mesa!'
                            })
                          }
                        } else {

                          novoPedido.bar = bar;
                          novoPedido.session = session;
                          novoPedido.name = nome;
                          novoPedido.phone = telefone;
                          novoPedido.items = JSON.stringify(CarrinhoFinal);
                          novoPedido.created_at = dataAgora;
                          novoPedido.payment = Number(paymentMethod) == 0 ? 'Dinheiro' : Number(paymentMethod) == 1 ? 'Credito' : 'Debito';
                          novoPedido.troco = Number(paymentMethod) == 0 ? troco >= 1 ? troco : null : null
                          novoPedido.status = 0;

                          pedidosRepo.save(novoPedido)
                        }


                      } else {
                        return res.status(503).json({
                          error: 'One of more items are invalid!'
                        })
                      }
                    })
                  } else {
                    return res.status(503).json({
                      error: 'Esse bar nao esta aceitando pedidos agora...'
                    })
                  }

                } else {

                  return res.status(404).json({
                    error: 'Bar not found!'
                  })
                }

              } else {
                return res.status(503).json({
                  error: 'Carrinho must be an array!'
                })
              }
            } else {
              return res.status(503).json({
                error: 'Payment method must be a valid value!'
              })
            }
          } else {
            return res.status(503).json({
              error: 'Telefone length must be 11'
            })
          }
        } else {
          return res.status(503).json({
            error: 'Nome length must be >3 '
          })
        }
      } else {
        return res.status(503).json({
          error: 'Missing params'
        })
      }


    } else {
      return res.status(403).json({
        error: 'Invalid Session!'
      })
    }

    return res.json({ ok: true })

  }

  async listUser(req: Request, res: Response) {
    const id = req.userId;

    const { barId } = req.body;

    const sessionRepo = getRepository(Sessions)
    const session = await sessionRepo.findOne({
      where: { id }
    })

    if (session) {
      const barRepo = getRepository(Bars)
      const barAchado = await barRepo.findOne({
        where: { id: barId }
      })

      if (barAchado) {
        const pedidosRepo = getRepository(Pedidos)
        const pedidosAchados = await pedidosRepo.find({
          where: { session: session, bar: barAchado },
          select: ['id', 'items', 'status', 'payment', 'troco', 'created_at']
        })

        pedidosAchados.sort(function (a: any, b: any) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return Number(new Date(b.created_at)) - Number(new Date(a.created_at));
        });

        let valorFinal = 0


        let novoPedidos: any = []
        return Promise.all(
          pedidosAchados.map((item: any) => {
            JSON.parse(item.items).map((itemzinho: any) => {
              valorFinal += (itemzinho.quantity * itemzinho.price)
            })
            novoPedidos.push({
              id: item.id,
              items: JSON.parse(item.items),
              status: item.status,
              payment: item.payment,
              troco: item.troco,
              created_at: item.created_at,
              total: valorFinal
            })
          })
        ).then(() => {
          return res.json(novoPedidos)
        })

      } else {
        return res.status(404).json({
          error: 'Bar not found!'
        })
      }


    } else {
      return res.status(403).json({
        error: 'Not a valid session!'
      })
    }

  }

  async listBar(req: Request, res: Response) {
    const id = req.userId;

    const hostRepo = getRepository(Host)
    const host = await hostRepo.findOne({
      where: { id }
    })

    if (host) {
      const barRepo = getRepository(Bars)
      const barAchado = await barRepo.findOne({
        where: {
          host: host
        }
      })

      if (barAchado) {

        let dataAgora = new Date()
        let timezone = dataAgora.getTimezoneOffset()

        // timezone brasil = 180 
        if (timezone != 180) {
          let b = 180 - timezone;
          dataAgora.setMinutes(dataAgora.getMinutes() - b);
        }
        dataAgora.setDate(dataAgora.getDate() - 1)

        // agora listar todos os pedidos, nas ultimas 24 horas, menos os negados
        const pedidosRepo = getRepository(Pedidos)
        const pedidos = await pedidosRepo.find({
          where: { bar: barAchado, created_at: MoreThan(dataAgora) },
          select: ['id', 'name', 'phone', 'items', 'status', 'payment', 'mesa', 'troco', 'created_at']
        })

        let pedidosArray: any = [
          { items: [] },
          { items: [] },
          { items: [] },
          { items: [] },
          { items: [] }
        ]

        let dataNow = new Date()

        // timezone brasil = 180 
        if (timezone != 180) {
          let b = 180 - timezone;
          dataNow.setMinutes(dataNow.getMinutes() - b);
        }


        pedidos.map((item: any) => {
          var diff: any = Math.abs(Number(new Date(item.created_at)) - Number(new Date(dataNow)));
          var minutes = Math.floor((diff / 1000) / 60);
          let valorTotal = 0
          JSON.parse(item.items).map((itemzinho: any) => {
            valorTotal += itemzinho.price * itemzinho.quantity
          })
          const itemObj = {
            id: item.id,
            customer: item.name,
            phone: item.phone,
            items: JSON.parse(item.items),
            payment: item.payment,
            troco: item.troco,
            minutes: minutes,
            total: valorTotal,
            mesa: item.mesa 
          }
          if (item.status < 5) {
            pedidosArray[item.status].items.push(itemObj)
          }
        })

        return res.json(pedidosArray)

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

  async setNewValue(req: Request, res: Response) {

    const id = req.userId;
    const { pedidoId, newStatus } = req.body;

    const hostRepo = getRepository(Host)
    const hostAchado = await hostRepo.findOne({
      where: { id }
    })

    if (hostAchado) {
      const barRepo = getRepository(Bars)
      const barAchado = await barRepo.findOne({
        where: { host: hostAchado }
      })

      if (barAchado) {
        if (validate(pedidoId) && newStatus) {
          const pedidoRepo = getRepository(Pedidos)
          const pedidoAchado = await pedidoRepo.findOne({
            where: { bar: barAchado, id: pedidoId }
          })

          if (pedidoAchado) {
            if (newStatus >= 1 && newStatus <= 5) {

              const statusAtual = pedidoAchado.status;
              if (statusAtual == 4) {
                return res.status(503).json({
                  error: 'Pedido ja foi confirmado!'
                })
              } else {

                if (newStatus <= statusAtual) {
                  return res.status(503).json({
                    error: 'New status must be greater than statusAtual '
                  })
                } else {
                  pedidoAchado.status = newStatus
                  await pedidoRepo.save(pedidoAchado)

                  return res.json({
                    ok: true
                  })
                }
              }

            } else {
              return res.status(503).json({
                error: 'New status must be 1> <5'
              })
            }



          } else {
            return res.status(404).json({
              error: 'Pedido not found!F'
            })
          }
        } else {
          return res.status(503).json({
            error: 'pedidoId must be UUID, or missing newStatus'
          })
        }
      } else {
        return res.status(404).json({
          error: 'You have 0 bars!'
        })
      }

    } else {
      return res.status(403).json({
        error: 'You are not a host'
      })
    }



  }

}

export default new PedidosController();