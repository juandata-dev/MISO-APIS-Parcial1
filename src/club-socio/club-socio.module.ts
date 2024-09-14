/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClubSocioService } from './club-socio.service';
import { ClubEntity } from 'src/clubs/club.entity';
import { SocioEntity } from 'src/socios/socio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([ClubEntity, SocioEntity])],
  providers: [ClubSocioService],
})
export class ClubSocioModule {}
