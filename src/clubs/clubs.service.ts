import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClubEntity } from './club.entity';
import { BusinessError, BusinessException } from '../shared/errors/errors';

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
		const club = await this.clubRepository.findOne({ where: { id } });
		if (!club) {
			throw new BusinessException('El club con el id proporcionado no existe', BusinessError.NOT_FOUND);
		}
		return club;
	}

	async create(club: ClubEntity): Promise<ClubEntity> {
		if (club.descripcion.length > 100) {
			throw new BusinessException('La descripción excede los 100 caracteres', BusinessError.PRECONDITION_FAILED);
		}
		return await this.clubRepository.save(club);
	}

	async update(id: number, club: ClubEntity): Promise<ClubEntity> {
		if (club.descripcion.length > 100) {
			throw new BusinessException('La descripción excede los 100 caracteres', BusinessError.PRECONDITION_FAILED);
		}
		const clubPersisted = await this.clubRepository.findOne({ where: { id } });
		if (!clubPersisted) {
			throw new BusinessException('El club con el id proporcionado no existe', BusinessError.NOT_FOUND);
		}
		return await this.clubRepository.save({ ...clubPersisted, ...club });
	}

	async delete(id: number): Promise<void> {
		const clubToDelete = await this.clubRepository.findOne({ where: { id } });
		if (!clubToDelete) {
			throw new BusinessException('El club con el id proporcionado no existe', BusinessError.NOT_FOUND);
		}
		await this.clubRepository.remove(clubToDelete);
	}
}
