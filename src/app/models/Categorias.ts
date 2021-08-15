import { Column, Entity, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import Bars from './Bars';
import Host from './Host';
import Items from './Items';

@Entity('categorias')
class Categorias {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  index: number;

  @ManyToOne(type => Bars, Bars => Bars.categorias, { eager: true })
  bar: Bars;

  @OneToMany(type => Items, Items => Items.categoria)
  items: Items[]

}


export default Categorias;