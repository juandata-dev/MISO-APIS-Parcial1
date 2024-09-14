import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SocioService } from './socio.service';
import { SocioEntity } from './socio.entity';

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
  create(@Body() socio: SocioEntity) {
    return this.socioService.create(socio);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() socio: SocioEntity) {
    return this.socioService.update(+id, socio);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socioService.delete(+id);
  }
}