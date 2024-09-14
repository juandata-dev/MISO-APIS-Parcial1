import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocioEntity } from 'src/socios/socio.entity';
import { ClubEntity } from 'src/clubs/club.entity';

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
		const socio = await this.socioRepository.findOne({ where: { id: socioId } });
		
		if (!club || !socio) {
			throw new Error('Club o socio no encontrado');
		}

		club.socios.push(socio);
		await this.clubRepository.save(club);
	}

	async findMembersFromClub(clubId: number): Promise<SocioEntity[]> {
		const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ['socios'] });
		if (!club) {
			throw new Error('Club no encontrado');
		}
		return club.socios;
	}

	async findMemberFromClub(clubId: number, socioId: number): Promise<SocioEntity> {
		const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ['socios'] });
		if (!club) {
			throw new Error('Club no encontrado');
		}
		const socio = club.socios.find(s => s.id === socioId);
		if (!socio) {
			throw new Error('Socio no encontrado en el club');
		}
		return socio;
	}

	async updateMembersFromClub(clubId: number, socioIds: number[]): Promise<void> {
		const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ['socios'] });
		if (!club) {
			throw new Error('Club no encontrado');
		}
		const socios = await this.socioRepository.findByIds(socioIds);
		club.socios = socios;
		await this.clubRepository.save(club);
	}

	async deleteMemberFromClub(clubId: number, socioId: number): Promise<void> {
		const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ['socios'] });
		if (!club) {
			throw new Error('Club no encontrado');
		}
		club.socios = club.socios.filter(s => s.id !== socioId);
		await this.clubRepository.save(club);
	}
}
