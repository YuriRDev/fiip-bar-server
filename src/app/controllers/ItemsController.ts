import { Request, Response } from 'express'
import { getRepository } from 'typeorm';

import Host from '../models/Host'

import jwt from 'jsonwebtoken'

import secret from '../../secret';
import axios from 'axios';
import Bars from '../models/Bars';
import Items from '../models/Items';
import Categorias from '../models/Categorias';


class ItemController {
  async create(req: Request, res: Response) {
    const id = req.userId;

    const { barId, name, description, price, photo_url, categoriaId } = req.body;

    if (!barId || !name || !description || !price || !categoriaId) {
      return res.status(505).json({
        error: 'Missing params'
      })
    } else {

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

          if (bar.host.id == host?.id) {
            const itemRepo = getRepository(Items)
            const item = new Items()

            let dataAgora = new Date()
            let timezone = dataAgora.getTimezoneOffset()

            // timezone brasil = 180 
            if (timezone != 180) {
              let b = 180 - timezone;
              dataAgora.setMinutes(dataAgora.getMinutes() - b);
            }

            try {
              const categoriaRepo = getRepository(Categorias)
              const categoria = await categoriaRepo.findOne({
                where: { id: categoriaId }
              })


              const itemsLength = await itemRepo.find({
                where: { categoria }
              })

              console.log(itemsLength.length)

              if (categoria) {
                if (categoria.bar.host.id == host.id) {
                  item.active = true;
                  item.bar = bar;
                  item.created_at = dataAgora;
                  item.photo_url = photo_url;
                  item.description = description;
                  item.name = name;
                  item.price = price;
                  item.categoria = categoria;
                  item.index = Number(itemsLength.length)

                  await itemRepo.save(item)

                  return res.json({
                    created: true,
                    id: item.id,
                    name: item.name,
                    created_at: item.created_at,
                    price: item.price,
                    photo_url: item.photo_url
                  })
                } else {
                  return res.status(403).json({
                    error: 'you are not the host for this category'
                  })
                }

              } else {
                return res.status(404).json({
                  error: 'Invalid Categoria Id!'
                })
              }
            } catch (err) {
              return res.status(404).json({
                error: 'Invalid Categoria Id!'
              })
            }

          } else {
            return res.status(403).json({
              error: 'You are not the host for this bar!'
            })
          }


        } else {
          return res.status(505).json({
            error: 'invalid BarId!'
          })
        }

      } catch (err) {
        return res.status(505).json({
          error: 'invalid BarId!'
        })
      }


    }

  }

  async listById(req: Request, res: Response) {
    const { barId } = req.body;

    const barRepo = getRepository(Bars)
    try {
      const bar = await barRepo.findOne({
        where: { id: barId }
      })

      if (bar) {
        const itemsRepo = getRepository(Items)
        const items = await itemsRepo.find({
          where: { bar }
        })

        // listar categorias
        let itemsOrdem: any = []
        items.map((item: any) => {
          itemsOrdem[item.categoria.index] = {
            categoriaId: item.categoria.id,
            categoria: item.categoria.name,
            items: []
          }
        })

        // adicionar items na categoria
        itemsOrdem.map((item: any, index: number) => {
          let itemsAdicionados: any = []
          items.map((itemzinho: any) => {
            if (itemzinho.categoria.id == item.categoriaId) {
              itemsAdicionados.push({
                id: itemzinho.id,
                name: itemzinho.name,
                description: itemzinho.description,
                price: itemzinho.price,
                photo_url: itemzinho.photo_url,
                active: itemzinho.active,
                index: itemzinho.index
              })
            }
          })
          itemsAdicionados.sort((a: any, b: any) => (a.index > b.index) ? 1 : -1)
          itemsOrdem[index].items = itemsAdicionados
        })

        let itemsCompensados: any = []
        itemsOrdem.map((item: any) => {
          itemsCompensados.push(item)
        })


        return res.json(itemsCompensados)

      } else {
        return res.status(404).json({
          error: 'Bar Not Found!'
        })
      }

    } catch (err) {
      console.log(err)
      return res.status(404).json({
        error: 'Bar Not Found!'
      })
    }

  }

}

export default new ItemController();