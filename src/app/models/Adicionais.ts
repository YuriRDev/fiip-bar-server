import { Column, Entity, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import Bars from './Bars';
import Categorias from './Categorias';
import Host from './Host';

@Entity('adicionais')
class Adicionais {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Bars, Bars => Bars.adicionais)
  bar: Bars;

  @Column()
  name: string;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;
}


export default Adicionais;