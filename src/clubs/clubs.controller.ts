import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ClubDto } from './club.dto';
import { plainToInstance } from 'class-transformer'
import { ErroresNegocioInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor'
import { ClubEntity } from './club.entity';


@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get()
  async findAll() {
    return this.clubsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clubsService.findOne(+id);
  }

  @Post()
  async create(@Body() clubDto: ClubDto) {
    const club: ClubEntity = plainToInstance(ClubEntity, clubDto);
    return await this.clubsService.create(club);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() clubDto: ClubDto) {
    const club: ClubEntity = plainToInstance(ClubEntity, clubDto);
    return await this.clubsService.update(+id, club);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return this.clubsService.delete(+id);
  }
}