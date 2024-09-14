import { Injectable } from '@nestjs/common';
import { ClubEntity } from './club.entity';

@Injectable()
export class ClubsService {
    private clubs: ClubEntity[] = []; // Aquí se usará una base de datos en lugar de un array

    findAll(): ClubEntity[] {
        return this.clubs;
      }
    
      findOne(id: number): ClubEntity {
        return this.clubs.find(club => club.id === id);
      }
      
      create(club: ClubEntity): ClubEntity {
        if (club.descripcion.length > 100) {
          throw new Error('La descripción excede los 100 caracteres');
        }
        this.clubs.push(club);
        return club;
      }
    
      update(id: number, club: ClubEntity): ClubEntity {
        if (club.descripcion.length > 100) {
          throw new Error('La descripción excede los 100 caracteres');
        }
        const index = this.clubs.findIndex(c => c.id === id);
        this.clubs[index] = club;
        return club;
      }
    
      delete(id: number): void {
        this.clubs = this.clubs.filter(club => club.id !== id);
      }
}
