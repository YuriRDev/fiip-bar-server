import { Column, Entity, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import Delivery from './Delivery';
import Pedidos from './Pedidos';

@Entity('sessions')
class Sessions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(type => Pedidos, Pedidos => Pedidos.session)
  pedidos: Pedidos[]

  @OneToMany(type => Delivery, Delivery => Delivery.session)
  delivery: Delivery[]

  @Column()
  ip: string;

  @CreateDateColumn()
  created_at: Date;
}


export default Sessions;