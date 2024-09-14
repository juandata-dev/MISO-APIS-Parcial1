import { Injectable } from '@nestjs/common';
import { SocioEntity } from './socio.entity';

@Injectable()
export class SocioService {
    private socios: SocioEntity[] = []; // Aquí se usará una base de datos en lugar de un array

    findAll(): SocioEntity[] {
        return this.socios;
      }
    
      findOne(id: number): SocioEntity {
        return this.socios.find(socio => socio.id === id);
      }
    
      create(socio: SocioEntity): SocioEntity {
        if (!socio.email.includes('@')) {
          throw new Error('Email inválido');
        }
        this.socios.push(socio);
        return socio;
      }
    
      update(id: number, socio: SocioEntity): SocioEntity {
        if (!socio.email.includes('@')) {
          throw new Error('Email inválido');
        }
        const index = this.socios.findIndex(s => s.id === id);
        this.socios[index] = socio;
        return socio;
      }
    
      delete(id: number): void {
        this.socios = this.socios.filter(socio => socio.id !== id);
      }
}
