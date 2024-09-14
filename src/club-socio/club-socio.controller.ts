/* eslint-disable prettier/prettier */
import { Controller, Get, HttpCode, Post, Put, Delete, Param, Body, UseInterceptors } from '@nestjs/common';
import { ClubSocioService } from './club-socio.service';
import { ClubSocioDto } from './club-socio.dto';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor'

@Controller('clubs')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClubSocioController {
  constructor(private readonly clubSocioService: ClubSocioService) {}

  @Post(':clubId/members')
  async addMemberToClub(@Param('clubId') clubId: number, @Param('socioId') socioId: number) {
    return await this.clubSocioService.addMemberToClub(clubId, socioId);
  }

  @Get(':clubId/members')
  async findMembersFromClub(@Param('clubId') clubId: number) {
    return await this.clubSocioService.findMembersFromClub(clubId);
  }

  @Get(':clubId/members/:socioId')
  async findMemberFromClub(@Param('clubId') clubId: number, @Param('socioId') socioId: number) {
    return await this.clubSocioService.findMemberFromClub(clubId, socioId);
  }

  @Put(':clubId/members')
  async updateMembersFromClub(@Param('clubId') clubId: number, @Body() clubSocioDtos: ClubSocioDto[]) {
    const socioIds = plainToInstance(ClubSocioDto, clubSocioDtos).map(dto => dto.socioId);
    return await this.clubSocioService.updateMembersFromClub(clubId, socioIds);
  }

  @Delete(':clubId/members/:socioId')
  @HttpCode(204)
  async deleteMemberFromClub(@Param('clubId') clubId: number, @Param('socioId') socioId: number) {
    return await this.clubSocioService.deleteMemberFromClub(clubId, socioId);
  }
}
