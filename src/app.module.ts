import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocioService } from './socios/socio.service';
import { ClubsService } from './clubs/clubs.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SocioService, ClubsService],
})
export class AppModule {}
