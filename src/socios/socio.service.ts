import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocioEntity } from './socio.entity';

@Injectable()
export class SocioService {
	constructor(
		@InjectRepository(SocioEntity)
		private socioRepository: Repository<SocioEntity>,
	) {}

	async findAll(): Promise<SocioEntity[]> {
		return this.socioRepository.find();
	}

	async findOne(id: number): Promise<SocioEntity> {
		return this.socioRepository.findOne({ where: { id } });
	}

	async create(socio: SocioEntity): Promise<SocioEntity> {
		if (!socio.email.includes('@')) {
			throw new Error('Email inválido');
		}
		return this.socioRepository.save(socio);
	}

	async update(id: number, socio: SocioEntity): Promise<SocioEntity> {
		if (!socio.email.includes('@')) {
			throw new Error('Email inválido');
		}
		await this.socioRepository.update(id, socio);
		return this.socioRepository.findOne({ where: { id } });
	}

	async delete(id: number): Promise<void> {
		await this.socioRepository.delete(id);
	}
}
