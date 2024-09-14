import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SocioEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombreUsuario: string;
  
    @Column()
    email: string;
  
    @Column()
    fechaNacimiento: Date;
}
