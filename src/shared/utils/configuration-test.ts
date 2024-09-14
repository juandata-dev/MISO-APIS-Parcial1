/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from 'src/clubs/club.entity';
import { SocioEntity } from 'src/socios/socio.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [
    SocioEntity,
    ClubEntity,
    ],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([
    SocioEntity,
    ClubEntity,
  ]),
];