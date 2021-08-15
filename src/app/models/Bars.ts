import { Column, Entity, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import Categorias from './Categorias';
import Host from './Host';
import Items from './Items';

@Entity('bares')
class Bars {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(type => Items, Items => Items.bar)
  items: Items[]

  @OneToMany(type => Categorias, Categorias => Categorias.bar)
  categorias: Categorias[]

  @ManyToOne(type => Host, Host => Host.bars, { eager: true })
  host: Host;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  type: string;

  @Column()
  open: string;

  @Column()
  color: string;

  @Column()
  photo_url: string;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;
}


export default Bars;