import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClubSocioService } from './club-socio.service';
import { ClubSocioDto } from './club-socio.dto';

@Controller('clubs')
export class ClubSocioController {
  constructor(private readonly clubSocioService: ClubSocioService) {}

  @Post(':clubId/members')
  addMemberToClub(@Param('clubId') clubId: string, @Body() clubSocioDto: ClubSocioDto) {
    return this.clubSocioService.addMemberToClub(+clubId, clubSocioDto.socioId);
  }

  @Get(':clubId/members')
  findMembersFromClub(@Param('clubId') clubId: string) {
    return this.clubSocioService.findMembersFromClub(+clubId);
  }

  @Get(':clubId/members/:socioId')
  findMemberFromClub(@Param('clubId') clubId: string, @Param('socioId') socioId: string) {
    return this.clubSocioService.findMemberFromClub(+clubId, +socioId);
  }

  @Put(':clubId/members')
  updateMembersFromClub(@Param('clubId') clubId: string, @Body() clubSocioDtos: ClubSocioDto[]) {
    const socioIds = clubSocioDtos.map(dto => dto.socioId);
    return this.clubSocioService.updateMembersFromClub(+clubId, socioIds);
  }

  @Delete(':clubId/members/:socioId')
  deleteMemberFromClub(@Param('clubId') clubId: string, @Param('socioId') socioId: string) {
    return this.clubSocioService.deleteMemberFromClub(+clubId, +socioId);
  }
}
