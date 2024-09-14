import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ClubEntity } from './club.entity';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get()
  findAll() {
    return this.clubsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubsService.findOne(+id);
  }

  @Post()
  create(@Body() club: ClubEntity) {
    return this.clubsService.create(club);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() club: ClubEntity) {
    return this.clubsService.update(+id, club);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clubsService.delete(+id);
  }
}