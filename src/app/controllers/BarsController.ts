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
      console.log("access by ", req.socket.remoteAddress)

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



        return res.json({
          id: bar.id,
          title: bar.title,
          description: bar.title,
          address: bar.address,
          open: barAberto,
          color: bar.color,
          photo_url: bar.photo_url,
          type: bar.type,
        })
      } else {
        console.log("access inalid, 404 ", req.socket.remoteAddress)

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



        return res.json({
          id: bar.id,
          title: bar.title,
          description: bar.title,
          address: bar.address,
          open: barAberto,
          color: bar.color,
          photo_url: bar.photo_url,
          type: bar.type,
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
        where: { host: host }, select: ['id', 'title', 'photo_url', 'active']
      })

      return res.json(bares)

    } else {
      return res.status(403).json({
        error: 'you are not a host'
      })
    }
  }


}

export default new BarsController();