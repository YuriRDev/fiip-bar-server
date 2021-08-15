import { Request, Response } from 'express'
import { getRepository } from 'typeorm';

import Host from '../models/Host'

import jwt from 'jsonwebtoken'

import secret from '../../secret';
import axios from 'axios';


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


        let dataAgora = new Date()
        let timezone = dataAgora.getTimezoneOffset()

        // timezone brasil = 180 
        if (timezone != 180) {
          let b = 180 - timezone;
          dataAgora.setMinutes(dataAgora.getMinutes() - b);
        }

        const host = new Host()
        host.name = name;
        host.email = email;
        host.password = password;
        host.created_at = dataAgora

        await hostRepo.save(host)

        return res.json({
          id: host.id,
          name: name,
          email: email,
        })
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

}

export default new HostController();