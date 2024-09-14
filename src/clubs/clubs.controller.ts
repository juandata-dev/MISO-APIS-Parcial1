import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, UseInterceptors } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ClubDto } from './club.dto';
import { plainToInstance } from 'class-transformer'
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor'
import { ClubEntity } from './club.entity';


@Controller('clubs')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get()
  async findAll() {
    return this.clubsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.clubsService.findOne(id);
  }

  @Post()
  async create(@Body() clubDto: ClubDto) {
    const club: ClubEntity = plainToInstance(ClubEntity, clubDto);
    return await this.clubsService.create(club);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() clubDto: ClubDto) {
    const club: ClubEntity = plainToInstance(ClubEntity, clubDto);
    return await this.clubsService.update(id, club);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number) {
    return this.clubsService.delete(id);
  }
}