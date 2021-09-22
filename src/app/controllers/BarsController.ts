import { Request, Response } from 'express'
import { Brackets, getRepository } from 'typeorm';

import Host from '../models/Host'

import jwt from 'jsonwebtoken'

import secret from '../../secret';
import axios from 'axios';
import Bars from '../models/Bars';


class BarsController {
  async create(req: Request, res: Response) {
    const id = req.userId;

    const { title, description, address, open, color, photo_url, type } = req.body

    const hostRepo = getRepository(Host)
    const host = await hostRepo.findOne({
      where: {
        id
      }
    })

    if (host) {
      if (!title || !description || !address || !open || !color || !type) {
        return res.status(505).json({
          error: 'Missing params'
        })
      } else {
        // tratando agora o open!
        let foto: string = ""
        if (photo_url) {
          foto = photo_url
        }
        // ver se ja existe um bar com o mesmo novo
        const barRepo = getRepository(Bars)

        const posts = await barRepo.createQueryBuilder("bares")
          .where("LOWER(bares.title) = LOWER(:title)", { title })
          .getMany();

        if (posts.length > 0) {
          return res.status(505).json({
            error: 'Bar Title already in use'
          })
        } else {
          // vendo se o open tem 7 de length
          if (open.length == 7) {
            // vendo se o color eh uma cor verdadeira
            if (String(color)[0] == "#") {
              // verificando o length do title >= 5
              if (title.length >= 5) {
                // ok, ta tudo certo, agora criar bar
                const barRepo = getRepository(Bars)
                const bar = new Bars()

                let dataAgora = new Date()
                let timezone = dataAgora.getTimezoneOffset()

                // timezone brasil = 180 
                if (timezone != 180) {
                  let b = 180 - timezone;
                  dataAgora.setMinutes(dataAgora.getMinutes() - b);
                }


                bar.title = title;
                bar.description = description;
                bar.address = address;
                bar.open = JSON.stringify(open);
                bar.color = color;
                bar.photo_url = foto;
                bar.active = true;
                bar.created_at = dataAgora
                bar.host = host;
                bar.type = type;

                barRepo.save(bar)

                return res.json({
                  created: true,
                  id: bar.id,
                  title: bar.title,
                  address: bar.address,
                  color: bar.color,
                  created_at: bar.created_at,
                })

              } else {
                return res.status(505).json({
                  error: 'Title lenght must be >= 5'
                })
              }
            } else {
              return res.status(505).json({
                error: 'Invalid Color format, must contain #'
              })
            }
          } else {
            return res.status(505).json({
              error: 'Invalid Open format'
            })
          }

        }


      }
    } else {
      return res.status(403).json({
        error: 'Invalid HostID!'
      })
    }

  }

  async getByName(req: Request, res: Response) {
    const { name } = req.body;


    if (name) {
      const barRepo = getRepository(Bars)

      const bar = await barRepo.createQueryBuilder("bares")
        .where("LOWER(bares.title) = LOWER(:title)", { title: name })
        .getOne();

      if (bar) {
        let dataAgora = new Date()
        let timezone = dataAgora.getTimezoneOffset()

        // timezone brasil = 180 
        if (timezone != 180) {
          let b = 180 - timezone;
          dataAgora.setMinutes(dataAgora.getMinutes() - b);
        }

        const diaAgora = dataAgora.getDay()

        // verificar se o bar esta aberto
        const diasAberto = JSON.parse(bar.open)
        let barAberto = false
        diasAberto.map((item: any) => {
          if (item.dia == diaAgora) {
            item.aberto.map((dia: string) => {
              const setarHoraInicio = Number(dia.split(' - ')[0].split(':')[0])
              const setarMinutoInicio = Number(dia.split(' - ')[0].split(':')[1])

              const setarHoraFinal = Number(dia.split(' - ')[1].split(':')[0])
              const setarMinutoFinal = Number(dia.split(' - ')[1].split(':')[1])

              if ((dataAgora.getHours() >= setarHoraInicio) && (dataAgora.getHours() <= setarHoraFinal)) {
                if (dataAgora.getHours() == setarHoraInicio) {
                  if (dataAgora.getMinutes() >= setarMinutoInicio) {
                    barAberto = true
                  } else {
                    barAberto = false
                  }
                }
                if (dataAgora.getHours() == setarHoraFinal) {
                  if (dataAgora.getMinutes() <= setarMinutoFinal) {
                    barAberto = true
                  } else {
                    barAberto = false
                  }
                }
                barAberto = true
              }
            })
          }
        })

        const barRepo = getRepository(Bars)
        const barAchado = await barRepo.findOne({
          where: { id: bar.id }
        })

        let isPremium = false;
        let isDelivery = false;
        let deliveryActive = false
        if (barAchado) {
          if (new Date(barAchado.host.delivery_validate) > dataAgora) {
            isDelivery = true
            deliveryActive = barAchado.deliveryActive
          }
          if (new Date(barAchado.host.premium_validate) > dataAgora) {
            isPremium = true
          }
        }



        return res.json({
          id: bar.id,
          title: bar.title,
          description: bar.title,
          address: bar.address,
          open: barAberto,
          color: bar.color,
          photo_url: bar.photo_url,
          type: bar.type,
          isPremium: isPremium,
          isDelivery: isDelivery,
          deliveryActive: deliveryActive,
          allowObs: bar.allowObs,
          active: bar.active,
          mesas: bar.mesas,
          telefone: bar.telefone,
          taxaDeEntrega: bar.taxaDeEntrega
        })
      } else {
        return res.status(404).json({
          error: 'Bar not found'
        })
      }

    } else {
      return res.status(404).json({
        error: 'Missing params'
      })
    }

  }

  async getById(req: Request, res: Response) {
    const { id } = req.body;

    if (id) {

      const barRepo = getRepository(Bars)

      const bar = await barRepo.findOne({
        where: { id }
      })

      if (bar) {
        let dataAgora = new Date()
        let timezone = dataAgora.getTimezoneOffset()

        // timezone brasil = 180 
        if (timezone != 180) {
          let b = 180 - timezone;
          dataAgora.setMinutes(dataAgora.getMinutes() - b);
        }

        const diaAgora = dataAgora.getDay()


        // verificar se o bar esta aberto
        const diasAberto = JSON.parse(bar.open)
        let barAberto = false
        diasAberto.map((item: any) => {
          if (item.dia == diaAgora) {
            item.aberto.map((dia: string) => {
              const setarHoraInicio = Number(dia.split(' - ')[0].split(':')[0])
              const setarMinutoInicio = Number(dia.split(' - ')[0].split(':')[1])

              const setarHoraFinal = Number(dia.split(' - ')[1].split(':')[0])
              const setarMinutoFinal = Number(dia.split(' - ')[1].split(':')[1])

              if ((dataAgora.getHours() >= setarHoraInicio) && (dataAgora.getHours() <= setarHoraFinal)) {
                if (dataAgora.getHours() == setarHoraInicio) {
                  if (dataAgora.getMinutes() >= setarMinutoInicio) {
                    barAberto = true
                  } else {
                    barAberto = false
                  }
                }
                if (dataAgora.getHours() == setarHoraFinal) {
                  if (dataAgora.getMinutes() <= setarMinutoFinal) {
                    barAberto = true
                  } else {
                    barAberto = false
                  }
                }
                barAberto = true
              }
            })
          }
        })

        let isPremium = false;

        if (new Date(bar.host.premium_validate) > dataAgora) {
          isPremium = true
        }

        const oneDay = 24 * 60 * 60 * 1000
        const firstDate: any = new Date(bar.host.premium_validate)
        const secondDate: any = dataAgora

        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

        return res.json({
          id: bar.id,
          title: bar.title,
          description: bar.title,
          address: bar.address,
          open: barAberto,
          color: bar.color,
          photo_url: bar.photo_url,
          type: bar.type,
          isPremium: isPremium,
          premium_validate: diffDays
        })
      } else {
        return res.status(404).json({
          error: 'Bar not found'
        })
      }

    } else {
      return res.status(404).json({
        error: 'Missing params'
      })
    }

  }

  async list(req: Request, res: Response) {
    const id = req.userId;

    const hostRepo = getRepository(Host)
    const host = await hostRepo.findOne({
      where: { id }
    })
    if (host) {
      const barRepo = getRepository(Bars)
      const bares = await barRepo.find({
        where: { host: host }, select: ['id', 'active', 'title', 'photo_url', 'telefone', 'mesas', 'color', 'description', 'address', 'deliveryActive', 'taxaDeEntrega']
      })

      let dataAgora = new Date()
      let timezone = dataAgora.getTimezoneOffset()

      // timezone brasil = 180 
      if (timezone != 180) {
        let b = 180 - timezone;
        dataAgora.setMinutes(dataAgora.getMinutes() - b);
      }

      let arraysBares: any = []



      bares.map((item: any) => {
        const ONE_DAY = 1000 * 60 * 60 * 24;

        // Calculate the difference in milliseconds
        const differenceMs = Math.abs(Number(host.premium_validate) - Number(dataAgora));
        const differenceMs2 = Math.abs(Number(host.delivery_validate) - Number(dataAgora));


        // Convert back to days and return
        const daysPremiumLeft = Math.round(differenceMs / ONE_DAY);
        const daysDeliveryLeft = Math.round(differenceMs2 / ONE_DAY);

        arraysBares.push({
          id: item.id,
          active: item.active,
          title: item.title,
          photo_url: item.photo_url,
          telefone: item.telefone,
          mesas: item.mesas,
          color: item.color,
          description: item.description,
          address: item.address,
          isPremium: (host.premium_validate > dataAgora),
          isDelivery: (host.delivery_validate > dataAgora),
          allowPedidosTrial: host.allowPedidosTrial,
          allowDeliveryTrial: host.allowDeliveryTrial,
          premiumDaysLeft: daysPremiumLeft,
          deliveryDaysLeft: daysDeliveryLeft,
          deliveryActive: item.deliveryActive,
          taxaDeEntrega: item.taxaDeEntrega
        })
      })

      return res.json(arraysBares)

    } else {
      return res.status(403).json({
        error: 'you are not a host'
      })
    }
  }

  async editPremium(req: Request, res: Response) {
    const id = req.userId

    const hostRepo = getRepository(Host)
    const host = await hostRepo.findOne({
      where: { id }
    })

    if (host) {

      const barRepo = getRepository(Bars)
      const barAchado = await barRepo.findOne({
        where: { host }
      })

      if (barAchado) {

        let dataAgora = new Date()
        let timezone = dataAgora.getTimezoneOffset()

        // timezone brasil = 180 
        if (timezone != 180) {
          let b = 180 - timezone;
          dataAgora.setMinutes(dataAgora.getMinutes() - b);
        }


        if (new Date(host.premium_validate) >= dataAgora) {


          const { mesas, pedidos, telefone } = req.body;

          if ((mesas || mesas == null) && (pedidos == true || pedidos == false) && (telefone || telefone == null)) {
            if (pedidos == true || pedidos == false) {
              if (mesas >= 0 && mesas <= 100 || mesas == null) {

                if (telefone == null) {

                  barAchado.active = pedidos;
                  barAchado.mesas = mesas;
                  barAchado.telefone = telefone;

                  await barRepo.save(barAchado)
                } else {
                  if (telefone.length == 11) {
                    barAchado.active = pedidos;
                    barAchado.mesas = mesas;
                    barAchado.telefone = telefone;

                    await barRepo.save(barAchado)
                  } else {

                    return res.status(503).json({
                      error: 'Telefone length must be 11'
                    })
                  }
                }

                return res.json({
                  changed: true
                })

              } else {
                return res.status(503).json({
                  error: 'Mesas must be a number between 0 and 100'
                })
              }
            } else {
              return res.status(503).json({
                error: 'Pedidos must be a boolean'
              })
            }
          } else {
            return res.status(503).json({ error: 'Missing params' })
          }
        } else {
          return res.status(403).json({
            error: 'Not premium!'
          })
        }
      } else {
        return res.status(403).json({
          error: 'You have 0 bar'
        })
      }
    } else {
      return res.status(403).json({
        error: 'You are not a host'
      })
    }

  }

  async editDelivery(req: Request, res: Response) {
    const id = req.userId

    const hostRepo = getRepository(Host)
    const host = await hostRepo.findOne({
      where: { id }
    })

    if (host) {

      const barRepo = getRepository(Bars)
      const barAchado = await barRepo.findOne({
        where: { host }
      })

      if (barAchado) {

        let dataAgora = new Date()
        let timezone = dataAgora.getTimezoneOffset()

        // timezone brasil = 180 
        if (timezone != 180) {
          let b = 180 - timezone;
          dataAgora.setMinutes(dataAgora.getMinutes() - b);
        }


        if (new Date(host.delivery_validate) >= dataAgora) {


          const { pedidos, telefone, taxa } = req.body;

          if ((pedidos == true || pedidos == false) && (telefone || telefone == null) && Number(taxa) >= 0) {
            if (pedidos == true || pedidos == false) {

              if (telefone == null) {

                barAchado.deliveryActive = pedidos;
                barAchado.telefone = telefone;
                barAchado.taxaDeEntrega = Number(taxa)

                await barRepo.save(barAchado)
              } else {
                if (telefone.length == 11) {
                  barAchado.deliveryActive = pedidos;
                  barAchado.telefone = telefone;
                  barAchado.taxaDeEntrega = Number(taxa)


                  await barRepo.save(barAchado)
                } else {

                  return res.status(503).json({
                    error: 'Telefone length must be 11'
                  })
                }
              }

              return res.json({
                changed: true
              })

            } else {
              return res.status(503).json({
                error: 'Missing pedidos'
              })
            }
          } else {
            return res.status(503).json({
              error: 'Pedidos must be a boolean'
            })
          }
        } else {
          return res.status(503).json({ error: 'Missing params' })
        }
      } else {
        return res.status(403).json({
          error: 'Not premium!'
        })
      }
    } else {
      return res.status(403).json({
        error: 'You have 0 bar'
      })
    }

  }

}

export default new BarsController();