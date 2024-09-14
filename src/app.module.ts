import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClubsModule } from './clubs/clubs.module';
import { ClubsService } from './clubs/clubs.service';
import { SociosModule } from './socios/socios.module';
import { SocioService } from './socios/socio.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ClubsModule,
    SociosModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocioService, ClubsService],
})
export class AppModule {}
