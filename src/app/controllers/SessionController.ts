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
import Sessions from '../models/Sessions';

class SessionController {
  async create(req: Request, res: Response) {
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

    const token = jwt.sign({ id: newSession.id }, secret, { expiresIn: '1000d' })

    return res.json({ token: token })
  }
}

export default new SessionController();