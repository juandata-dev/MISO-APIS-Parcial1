import { Module } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from './club.entity';
import { ClubsController } from './clubs.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ClubEntity])],
    providers: [ClubsService],
    controllers: [ClubsController],
    exports: [ClubsService],
})
export class ClubsModule {}
