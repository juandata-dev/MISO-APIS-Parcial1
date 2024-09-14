/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocioEntity } from 'src/socios/socio.entity';
import { ClubEntity } from 'src/clubs/club.entity';
import { BusinessError, BusinessException } from '../shared/errors/errors';

@Injectable()
export class ClubSocioService {
	constructor(
		@InjectRepository(ClubEntity)
		private clubRepository: Repository<ClubEntity>,
		@InjectRepository(SocioEntity)
		private socioRepository: Repository<SocioEntity>,
	) {}

	async addMemberToClub(clubId: number, socioId: number): Promise<void> {
		const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ['socios'] });
		if (!club) {
			throw new BusinessException('El club con el id proporcionado no existe', BusinessError.NOT_FOUND);
		}
		const socio = await this.socioRepository.findOne({ where: { id: socioId } });
		if (!socio) {
			throw new BusinessException('El socio con el id proporcionado no existe', BusinessError.NOT_FOUND);
		}
		
		club.socios.push(socio);
		await this.clubRepository.save(club);
	}

	async findMembersFromClub(clubId: number): Promise<SocioEntity[]> {
		const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ['socios'] });
		if (!club) {
			throw new BusinessException('El club con el id proporcionado no existe', BusinessError.NOT_FOUND);
		}
		return club.socios;
	}

	async findMemberFromClub(clubId: number, socioId: number): Promise<SocioEntity> {
		const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ['socios'] });
		if (!club) {
			throw new BusinessException('El club con el id proporcionado no existe', BusinessError.NOT_FOUND);
		}
		const socio = club.socios.find(s => s.id === socioId);
		if (!socio) {
			throw new BusinessException('El socio con el id proporcionado no existe en el club', BusinessError.NOT_FOUND);
		}
		return socio;
	}

	async updateMembersFromClub(clubId: number, socioIds: number[]): Promise<void> {
		const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ['socios'] });
		if (!club) {
			throw new BusinessException('El club con el id proporcionado no existe', BusinessError.NOT_FOUND);
		}
		for (const socioId of socioIds) {
			const socio = await this.socioRepository.findOne({ where: { id: socioId } });
			if (!socio) {
				throw new BusinessException('El socio con el id proporcionado no existe', BusinessError.NOT_FOUND);
			}
			club.socios.push(socio);
		}
		await this.clubRepository.save(club);
	}

	async deleteMemberFromClub(clubId: number, socioId: number): Promise<void> {
		const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ['socios'] });
		if (!club) {
			throw new BusinessException('El club con el id proporcionado no existe', BusinessError.NOT_FOUND);
		}
		const socio = club.socios.find(s => s.id === socioId);
		if (!socio) {
			throw new BusinessException('El socio con el id proporcionado no existe en el club', BusinessError.NOT_FOUND);
		}
		club.socios = club.socios.filter(s => s.id !== socioId);
		await this.clubRepository.save(club);
	}
}
