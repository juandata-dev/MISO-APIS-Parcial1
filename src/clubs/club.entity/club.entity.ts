import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
