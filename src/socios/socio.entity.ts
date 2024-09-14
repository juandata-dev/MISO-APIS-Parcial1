import { Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { ClubEntity } from '../clubs/club.entity';

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
    
    @ManyToMany(() => ClubEntity, club => club.socios)
    clubes: ClubEntity[];
}
