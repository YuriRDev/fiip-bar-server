import { json, Request, Response } from 'express'
import { getRepository, MoreThan, Not } from 'typeorm';


import secret from '../../secret';
import axios from 'axios';
import Bars from '../models/Bars';
import Items from '../models/Items';
import Categorias from '../models/Categorias';
import jwt from 'jsonwebtoken'

import { validate } from 'uuid'
import Sessions from '../models/Sessions';
import Pedidos from '../models/Pedidos';
import Host from '../models/Host';
import Adicionais from '../models/Adicionais';
import Delivery from '../models/Delivery';

class DeliveryController {
    async create(req: Request, res: Response) {
        const id = req.userId

        const { nome, telefone, carrinho, barId, cep, address, number, complemento, paymentMethod, troco } = req.body;

        // verificar se o ID eh valido

        const sessionRepo = getRepository(Sessions)
        const sessionUser = await sessionRepo.findOne({
            where: { id }
        })

        let session: any;
        let createdNewSession = false;

        let token: string;


        if (!sessionUser) {
            console.log('nao achou sessao')
            let userIp = (req.connection.remoteAddress?.split(':').pop())
            const sessionRepo = getRepository(Sessions)
            const newSession = new Sessions()

            let dataAgora = new Date()
            let timezone = dataAgora.getTimezoneOffset()

            // timezone brasil = 180 
            if (timezone != 180) {
                let b = 180 - timezone;
                dataAgora.setMinutes(dataAgora.getMinutes() - b);
            }

            newSession.ip = String(userIp);
            newSession.created_at = dataAgora;

            await sessionRepo.save(newSession);
            session = newSession.id;
            createdNewSession = true
            token = jwt.sign({ id: newSession.id }, secret, { expiresIn: '1000d' })
        } else {
            session = sessionUser
        }

        if (session) {
            if (nome && telefone && paymentMethod && carrinho && barId && cep && address && number) {
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
                                    if (bar.deliveryActive) {

                                        let adicionaisTotalArray: any = []

                                        Promise.all(
                                            carrinho.map(async (item: any, index: number) => {
                                                if (validate(item.id)) {
                                                    const itemAchado = await itemRepo.findOne({ where: { id: item.id } })
                                                    if (itemAchado && itemAchado.categoria.bar.id == barId) {
                                                        // itemName, price, obs, categoria

                                                        if (item.adicionais) {
                                                            item.adicionais.map((itemzinho: any) => {
                                                                adicionaisTotalArray.push({
                                                                    adicional: itemzinho,
                                                                    index: index
                                                                })
                                                            })


                                                        }

                                                        CarrinhoFinal.push({
                                                            name: itemAchado.name,
                                                            quantity: item.quantity,
                                                            price: itemAchado.price,
                                                            obs: item.obs,
                                                            adicionais: []
                                                        })

                                                        // SE NAO POSSUI CATEGORIA, NADA MUDA!

                                                    } else {
                                                        isCarrinhoItemsValid = false;
                                                    }
                                                } else {
                                                    isCarrinhoItemsValid = false
                                                }
                                            })
                                        ).then(async () => {
                                            if (isCarrinhoItemsValid) {
                                                // AGORA PEGAR OS NOVOS ADICIONAIS EM NOVA ORDEM DO PROMISE ALL

                                                const deliveryRepo = getRepository(Delivery)
                                                const novoDelivery = new Delivery()

                                                let dataAgora = new Date()
                                                let timezone = dataAgora.getTimezoneOffset()

                                                // timezone brasil = 180 
                                                if (timezone != 180) {
                                                    let b = 180 - timezone;
                                                    dataAgora.setMinutes(dataAgora.getMinutes() - b);
                                                }


                                                if (adicionaisTotalArray.length > 0) {
                                                    // adicionaisTotalArray = {adicional, index}
                                                    console.log(adicionaisTotalArray)

                                                    const adicionalRepo = getRepository(Adicionais)

                                                    Promise.all(
                                                        adicionaisTotalArray.map(async (item: any) => {
                                                            const adicionalAchado = await adicionalRepo.findOne({
                                                                where: { id: item.adicional, bar: bar }, select: ['id', 'price', 'name']
                                                            })
                                                            if (adicionalAchado) {
                                                                console.log(adicionalAchado)
                                                                let arrayAdicional = CarrinhoFinal[item.index].adicionais
                                                                arrayAdicional.push(adicionalAchado)
                                                                CarrinhoFinal[item.index].adicionais = arrayAdicional
                                                            }
                                                        })
                                                    ).then(() => {


                                                        novoDelivery.bar = bar;
                                                        novoDelivery.session = session;

                                                        novoDelivery.name = nome;
                                                        novoDelivery.phone = telefone;

                                                        novoDelivery.items = JSON.stringify(CarrinhoFinal);

                                                        novoDelivery.cep = Number(String(cep).replace('-', ''))
                                                        novoDelivery.address = address;
                                                        novoDelivery.number = number;
                                                        novoDelivery.complemento = complemento ? complemento : null;

                                                        novoDelivery.status = 0;
                                                        novoDelivery.payment = Number(paymentMethod) == 0 ? 'Dinheiro' : Number(paymentMethod) == 1 ? 'Credito' : 'Debito';
                                                        novoDelivery.troco = Number(paymentMethod) == 0 ? troco >= 1 ? troco : null : null
                                                        novoDelivery.created_at = dataAgora;

                                                        novoDelivery.taxaDeEntrega = bar.taxaDeEntrega

                                                        deliveryRepo.save(novoDelivery)
                                                        if (createdNewSession) {
                                                            return res.json({ token: token })
                                                        } else {
                                                            return res.json({ ok: true })
                                                        }

                                                    })

                                                } else {
                                                    novoDelivery.bar = bar;
                                                    novoDelivery.session = session;

                                                    novoDelivery.name = nome;
                                                    novoDelivery.phone = telefone;

                                                    novoDelivery.items = JSON.stringify(CarrinhoFinal);

                                                    novoDelivery.cep = Number(String(cep).replace('-', ''))
                                                    novoDelivery.address = address;
                                                    novoDelivery.number = number;
                                                    novoDelivery.complemento = complemento ? complemento : null;

                                                    novoDelivery.status = 0;
                                                    novoDelivery.payment = Number(paymentMethod) == 0 ? 'Dinheiro' : Number(paymentMethod) == 1 ? 'Credito' : 'Debito';
                                                    novoDelivery.troco = Number(paymentMethod) == 0 ? troco >= 1 ? troco : null : null
                                                    novoDelivery.created_at = dataAgora;
                                                    novoDelivery.taxaDeEntrega = bar.taxaDeEntrega

                                                    deliveryRepo.save(novoDelivery)
                                                    if (createdNewSession) {
                                                        return res.json({ token: token })
                                                    } else {
                                                        return res.json({ ok: true })
                                                    }

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
                console.log("error?")

                return res.status(503).json({
                    error: 'Missing params'
                })
            }


        } else {
            return res.status(403).json({
                error: 'Invalid Session!'
            })
        }


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
                const deliveryRepo = getRepository(Delivery)
                const delivery = await deliveryRepo.find({
                    where: { session: session, bar: barAchado },
                    select: ['id', 'items', 'status', 'payment', 'address', 'number', 'complemento', 'troco', 'created_at']
                })

                delivery.sort(function (a: any, b: any) {
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return Number(new Date(b.created_at)) - Number(new Date(a.created_at));
                });



                let novoPedidos: any = []
                delivery.map((item: any) => {

                    let valorFinal = 0
                    JSON.parse(item.items).map((itemzinho: any) => {
                        if (itemzinho.adicionais) {
                            itemzinho.adicionais.map((adicional: any) => {
                                valorFinal += (adicional.price)
                            })
                        }
                        valorFinal += (itemzinho.quantity * itemzinho.price)
                    })

                    novoPedidos.push({
                        id: item.id,
                        items: JSON.parse(item.items),
                        status: item.status,
                        payment: item.payment,
                        troco: item.troco,
                        created_at: item.created_at,
                        total: valorFinal,
                        address: item.address,
                        number: item.number,
                        complemento: item.complemento
                    })
                })
                return res.json(novoPedidos)

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

    // LISTAR OS PEDIDOS!


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
                const deliveryRepo = getRepository(Delivery)
                const delivery = await deliveryRepo.find({
                    where: { bar: barAchado, created_at: MoreThan(dataAgora) },
                    select: ['id', 'name', 'phone', 'items', 'status', 'payment', 'troco', 'created_at', 'address', 'cep', 'complemento', 'number']
                })

                let deliveryArray: any = [
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


                delivery.map((item: any) => {
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
                        cep: item.cep,
                        address: item.address,
                        complemento: item.complemento,
                        number: item.number
                    }
                    if (item.status < 5) {
                        deliveryArray[item.status].items.push(itemObj)
                    }
                })

                return res.json(deliveryArray)

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
                    const deliveryRepo = getRepository(Delivery)
                    const deliveryAchado = await deliveryRepo.findOne({
                        where: { bar: barAchado, id: pedidoId }
                    })

                    if (deliveryAchado) {
                        if (newStatus >= 1 && newStatus <= 5) {

                            const statusAtual = deliveryAchado.status;
                            if (statusAtual == 4) {
                                return res.status(503).json({
                                    error: 'Delivery ja foi confirmado!'
                                })
                            } else {

                                if (newStatus <= statusAtual) {
                                    return res.status(503).json({
                                        error: 'New status must be greater than statusAtual '
                                    })
                                } else {
                                    deliveryAchado.status = newStatus
                                    await deliveryRepo.save(deliveryAchado)

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
                            error: 'Delivery not found!F'
                        })
                    }
                } else {
                    return res.status(503).json({
                        error: 'DeliveryId must be UUID, or missing newStatus'
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

export default new DeliveryController();