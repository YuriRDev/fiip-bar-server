import { Column, Entity, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import Bars from './Bars';


@Entity('hosts')
class Host {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  premium_validate: Date;

  @Column()
  allowPedidosTrial: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  premium_type: number;

  @Column()
  delivery_validate: Date;

  @Column()
  delivery_type: Number;

  @Column()
  allowDeliveryTrial: Boolean;

  @OneToMany(type => Bars, Bars => Bars.host)
  bars: Bars[]

}


export default Host;