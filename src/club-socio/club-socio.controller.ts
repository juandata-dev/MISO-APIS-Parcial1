import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClubSocioService } from './club-socio.service';
import { SocioEntity } from '../socios/socio.entity';

@Controller('clubs')
export class ClubSocioController {
  constructor(private readonly clubSocioService: ClubSocioService) {}

  @Post(':clubId/members')
  addMemberToClub(@Param('clubId') clubId: string, @Body() socio: SocioEntity) {
    return this.clubSocioService.addMemberToClub(+clubId, socio.id); // Cambiar socio a socio.id
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
  updateMembersFromClub(@Param('clubId') clubId: string, @Body() socios: SocioEntity[]) {
    const socioIds = socios.map(socio => socio.id); // Mapear a un array de IDs
    return this.clubSocioService.updateMembersFromClub(+clubId, socioIds);
  }

  @Delete(':clubId/members/:socioId')
  deleteMemberFromClub(@Param('clubId') clubId: string, @Param('socioId') socioId: string) {
    return this.clubSocioService.deleteMemberFromClub(+clubId, +socioId);
  }
}
