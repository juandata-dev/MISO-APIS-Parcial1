import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClubEntity } from './club.entity';

@Injectable()
export class ClubsService {
	constructor(
		@InjectRepository(ClubEntity)
		private clubRepository: Repository<ClubEntity>,
	) {}

	async findAll(): Promise<ClubEntity[]> {
		return this.clubRepository.find();
	}

	async findOne(id: number): Promise<ClubEntity> {
		return this.clubRepository.findOne({ where: { id } });
	}

	async create(club: ClubEntity): Promise<ClubEntity> {
		if (club.descripcion.length > 100) {
			throw new Error('La descripción excede los 100 caracteres');
		}
		return this.clubRepository.save(club);
	}

	async update(id: number, club: ClubEntity): Promise<ClubEntity> {
		if (club.descripcion.length > 100) {
			throw new Error('La descripción excede los 100 caracteres');
		}
		await this.clubRepository.update(id, club);
		return this.clubRepository.findOne({ where: { id } });
	}

	async delete(id: number): Promise<void> {
		await this.clubRepository.delete(id);
	}
}
