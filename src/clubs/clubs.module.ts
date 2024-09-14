import { Module } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from './club.entity';


@Module({
    imports: [TypeOrmModule.forFeature([ClubEntity])],
    providers: [ClubsService],
    exports: [ClubsService],
})
export class ClubsModule {}
