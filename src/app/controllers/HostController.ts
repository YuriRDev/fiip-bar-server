import { application, Request, response, Response } from 'express'
import { getRepository } from 'typeorm';

import Host from '../models/Host'

import jwt from 'jsonwebtoken'

import secret from '../../secret';
import axios from 'axios';
import Bars from '../models/Bars';


class HostController {
  async create(req: Request, res: Response) {

    const { name, email, password } = req.body;

    const hostRepo = getRepository(Host);
    const hostEmail = await hostRepo.findOne({
      where: { email: email }
    })

    if (!name || !email || !password) {
      return res.status(505).json({
        error: 'missing params'
      })
    } else {
      if (hostEmail) {
        return res.status(505).json({
          error: 'email already in use'
        })
      } else {
        // verificar se senha tem mais de 6 caracteres
        // verificar se nome tem mais de 5 caracteres
        // verificar se email eh email

        if (name.split('-').length > 1) {
          return res.status(503).json({
            error: 'Can not use - '
          })
        } else {


          let dataAgora = new Date()
          let timezone = dataAgora.getTimezoneOffset()

          // timezone brasil = 180 
          if (timezone != 180) {
            let b = 180 - timezone;
            dataAgora.setMinutes(dataAgora.getMinutes() - b);
          }

          const barRepo = getRepository(Bars)

          const posts = await barRepo.createQueryBuilder("bares")
            .where("LOWER(bares.title) = LOWER(:title)", { title: name })
            .getMany();

          if (posts.length > 0) {
            return res.status(505).json({
              error: 'Bar Title already in use'
            })
          } else {
            const host = new Host()
            host.name = name;
            host.email = email;
            host.password = password;
            host.created_at = dataAgora

            await hostRepo.save(host)

            // agora criar o bar!!
            const bar = new Bars()
            bar.host = host;
            bar.title = name;
            bar.created_at = dataAgora;
            bar.description = "";
            bar.type = 'off';
            bar.active = false;
            bar.address = "Adicione um endereco..."
            bar.open = JSON.stringify([{ "dia": "0", "aberto": ["00:00 - 23:59"] }, { "dia": "1", "aberto": ["00:00 - 23:59"] }, { "dia": "2", "aberto": ["00:00 - 23:59"] }, { "dia": "3", "aberto": ["00:00 - 23:59"] }, { "dia": "4", "aberto": ["00:00 - 23:59"] }, { "dia": "5", "aberto": ["00:00 - 23:59"] }, { "dia": "6", "aberto": ["00:00 - 23:59"] }])
            bar.color = '#3286C5'
            bar.photo_url = 'https://fiip-img.s3.sa-east-1.amazonaws.com/addImage.png'

            await barRepo.save(bar)


            const token = jwt.sign({ id: host.id }, secret, { expiresIn: '1000d' })


            return res.json({
              token: token
            })
          }
        }

      }
    }


  }

  async login(req: Request, res: Response) {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({ error: 'Missing Credentials!' })
    }

    email = email.toLowerCase()

    const hostRepo = getRepository(Host);

    const host = await hostRepo.findOne({ where: { email } })

    if (!host) {
      return res.status(403).json({ error: "Email not found!" })
    }

    if (password != host.password) {
      return res.status(403).json({ error: "Wrong Password!" })
    }


    const token = jwt.sign({ id: host.id }, secret, { expiresIn: '1000d' })

    return res.json({
      id: host.id,
      name: host.name,
      token: token
    })
  }

  async edit(req: Request, res: Response) {
    const id = req.userId;

    const { title, description, color, photo } = req.body;

    if (title && color && photo) {

      if (title.split("-").length == 1) {
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


            const posts = await barRepo.createQueryBuilder("bares")
              .where("LOWER(bares.title) = LOWER(:title)", { title })
              .getMany();


            if (String(bar.title).toLowerCase() != title.toLowerCase()) {
              if (posts.length > 0) {
                return res.status(503).json({
                  error: 'Bar with that name already exists!'
                })
              } else {
                bar.title = title;
                bar.description = description ? description : null;
                bar.color = color;
                bar.photo_url = photo;

                await barRepo.save(bar)

                return res.json({
                  ok: true
                })

              }
            } else {
              // agora eh salvar os novos dados do cardapio!

              bar.title = title;
              bar.description = description;
              bar.color = color;
              bar.photo_url = photo;

              await barRepo.save(bar)

              return res.json({
                ok: true
              })

            }

          } else {
            return res.status(403).json({
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
          error: 'Title can not have - as param!'
        })
      }

    }
  }


  async getPedidosTrial(req: Request, res: Response) {
    const id = req.userId;

    console.log(id)

    const hostRepo = getRepository(Host)
    const host = await hostRepo.findOne({
      where: { id }
    })

    if (host) {
      if (host.allowPedidosTrial) {
        // agora pegar a data atual e adicionar 14 dias 
        const data14Dias = new Date(Date.now() + 12096e5);

        host.allowPedidosTrial = false;
        host.premium_validate = data14Dias;
        host.premium_type = 1;

        // premium type 1 = essencial
        // premium type 2 = premium
        const barRepo = getRepository(Bars)
        const bar = await barRepo.findOne({
          where: { host }
        })

        if (bar) {
          bar.active = true
          await barRepo.save(bar)
        }


        await hostRepo.save(host)

        return res.json({
          ok: true
        })

      } else {
        return res.status(403).json({
          error: 'you are not allowed to get Pedidos Trial!'
        })
      }

    } else {
      return res.status(403).json({
        error: 'You are not a host!'
      })
    }
  }

}

export default new HostController();