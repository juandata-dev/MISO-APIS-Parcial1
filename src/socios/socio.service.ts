/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocioEntity } from './socio.entity';
import { BusinessError, BusinessException } from '../shared/errors/errors';

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
		const socio = await this.socioRepository.findOne({ where: { id } });
		if (!socio) {
			throw new BusinessException('El socio con el id proporcionado no existe', BusinessError.NOT_FOUND);
		}
		return socio;
	}

	async create(socio: SocioEntity): Promise<SocioEntity> {
		if (!socio.email.includes('@')) {
			throw new BusinessException('Email inválido', BusinessError.PRECONDITION_FAILED);
		}
		return await this.socioRepository.save(socio);
	}

	async update(id: number, socio: SocioEntity): Promise<SocioEntity> {
		if (!socio.email.includes('@')) {
			throw new BusinessException('Email inválido', BusinessError.PRECONDITION_FAILED);
		}
		const socioPersistido: SocioEntity = await this.socioRepository.findOne({where: {id}});
		if (!socioPersistido) {
			throw new BusinessException('El socio con el id proporcionado no existe', BusinessError.NOT_FOUND);
		}
		return await this.socioRepository.save({...socioPersistido, ...socio});
	}

	async delete(id: number): Promise<void> {
		const socio = await this.socioRepository.findOne({ where: { id } });
		if (!socio) {
			throw new BusinessException('El socio con el id proporcionado no existe', BusinessError.NOT_FOUND);
		}
		await this.socioRepository.delete(id);
	}
}
