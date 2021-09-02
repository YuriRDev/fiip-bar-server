import { Column, Entity, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import Bars from './Bars';
import Categorias from './Categorias';
import Host from './Host';

@Entity('items')
class Items {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Bars, Bars => Bars.items)
  bar: Bars;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  index: Number;

  @Column()
  price: number;

  @Column()
  adicionais: string;

  @ManyToOne(type => Categorias, Categorias => Categorias.items, { eager: true })
  categoria: Categorias;

  @Column()
  photo_url: string;

  @CreateDateColumn()
  created_at: Date;
}


export default Items;