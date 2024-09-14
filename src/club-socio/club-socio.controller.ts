/* eslint-disable prettier/prettier */
import { Controller, Get, HttpCode, Post, Put, Delete, Param, Body, UseInterceptors } from '@nestjs/common';
import { ClubSocioService } from './club-socio.service';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor'
import { SocioEntity } from 'src/socios/socio.entity';
import { SocioDto } from '../socios/socio.dto';

@Controller('clubs')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClubSocioController {
  constructor(private readonly clubSocioService: ClubSocioService) {}

  @Post(':clubId/socios/:socioId')
  async addMemberToClub(@Param('clubId') clubId: number, @Param('socioId') socioId: number) {
    return await this.clubSocioService.addMemberToClub(clubId, socioId);
  }

  @Get(':clubId/socios')
  async findMembersFromClub(@Param('clubId') clubId: number) {
    return await this.clubSocioService.findMembersFromClub(clubId);
  }

  @Get(':clubId/socios/:socioId')
  async findMemberFromClub(@Param('clubId') clubId: number, @Param('socioId') socioId: number) {
    return await this.clubSocioService.findMemberFromClub(clubId, socioId);
  }

  @Put(':clubId/socios')
  async updateMembersFromClub(@Body() socioDto: SocioDto[], @Param('clubId') clubId: number) {
    const socios = plainToInstance(SocioEntity, socioDto)
    return await this.clubSocioService.updateMembersFromClub(clubId, socios)
  }

  @Delete(':clubId/socios/:socioId')
  @HttpCode(204)
  async deleteMemberFromClub(@Param('clubId') clubId: number, @Param('socioId') socioId: number) {
    return await this.clubSocioService.deleteMemberFromClub(clubId, socioId);
  }
}
