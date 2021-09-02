import { Column, Entity, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import Bars from './Bars';
import Host from './Host';
import Items from './Items';
import Sessions from './Sessions';

@Entity('pedidos')
class Pedidos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Bars, Bars => Bars.pedidos, { eager: true })
  bar: Bars;

  @ManyToOne(type => Sessions, Sessions => Sessions.pedidos, { eager: true })
  session: Sessions;

  @Column()
  mesa: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  items: string;

  @Column()
  status: number;

  @Column()
  payment: string;

  @Column()
  troco: number;

  @CreateDateColumn()
  created_at: Date;
}


export default Pedidos;