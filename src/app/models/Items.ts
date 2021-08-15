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
  price: number;

  @ManyToOne(type => Categorias, Categorias => Categorias.items, { eager: true })
  categoria: Categorias;

  @Column()
  photo_url: string;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;
}


export default Items;