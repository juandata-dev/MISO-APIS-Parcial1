import { Entity, Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SocioEntity } from '../../socios/socio.entity/socio.entity';

@Entity()
export class ClubEntity {
@PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  fechaFundacion: Date;

  @Column()
  imagen: string;

  @Column({ length: 100 })
  descripcion: string;

  @ManyToMany(() => SocioEntity, socio => socio.clubes)
  @JoinTable()
  socios: SocioEntity[];
}
