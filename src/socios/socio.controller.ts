import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SocioService } from './socio.service';
import { SocioDto } from './socio.dto';

@Controller('socios')
export class SocioController {
  constructor(private readonly socioService: SocioService) {}

  @Get()
  findAll() {
    return this.socioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socioService.findOne(+id);
  }

  @Post()
  create(@Body() socioDto: SocioDto) {
    return this.socioService.create(socioDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() socioDto: SocioDto) {
    return this.socioService.update(+id, socioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socioService.delete(+id);
  }
}