import { Request, Response } from 'express'
import { getRepository } from 'typeorm';

import Host from '../models/Host'

import jwt from 'jsonwebtoken'

import secret from '../../secret';
import axios from 'axios';
import Bars from '../models/Bars';
import Items from '../models/Items';
import Categorias from '../models/Categorias';


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

          return res.json(categorias)
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


}

export default new CategoriaController();