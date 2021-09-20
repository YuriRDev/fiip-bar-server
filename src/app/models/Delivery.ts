import { Column, Entity, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import Bars from './Bars';
import Host from './Host';
import Items from './Items';
import Sessions from './Sessions';

@Entity('delivery')
class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Bars, Bars => Bars.delivery, { eager: true })
  bar: Bars;

  @ManyToOne(type => Sessions, Sessions => Sessions.pedidos, { eager: true })
  session: Sessions;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  items: string;

  @Column()
  cep: number;

  @Column()
  address: number;

  @Column()
  number: number;

  @Column()
  complemento: number;

  @Column()
  status: number;

  @Column()
  payment: string;

  @Column()
  troco: number;

  @Column()
  taxaDeEntrega: number;

  @CreateDateColumn()
  created_at: Date;

}


export default Delivery;