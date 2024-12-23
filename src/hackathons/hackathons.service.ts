import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hackathon } from './entities/hackathon.entity';
import { CreateHackathonDto } from './dto/create-hackathon.dto';
import { UpdateHackathonDto } from './dto/update-hackathon.dto';
import { QueryHackathonDto } from './dto/query-hackathon.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class HackathonsService {
  constructor(
    @InjectRepository(Hackathon)
    private hackathonRepository: Repository<Hackathon>,
  ) {}

  async create(createHackathonDto: CreateHackathonDto): Promise<Hackathon> {
    const hackathon = this.hackathonRepository.create(createHackathonDto);
    return await this.hackathonRepository.save(hackathon);
  }

  async findAll(query: QueryHackathonDto, pagination: PaginationDto) {
    const queryBuilder = this.hackathonRepository.createQueryBuilder('hackathon');

    if (query.search) {
      queryBuilder.where('hackathon.title ILIKE :search OR hackathon.description ILIKE :search', {
        search: `%${query.search}%`,
      });
    }

    if (query.status) {
      queryBuilder.andWhere('hackathon.status = :status', { status: query.status });
    }

    if (query.sortBy) {
      queryBuilder.orderBy(`hackathon.${query.sortBy}`, query.sortOrder || 'ASC');
    }

    const skip = (pagination.page - 1) * pagination.limit;
    queryBuilder.skip(skip).take(pagination.limit);

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items,
      total,
      page: pagination.page,
      limit: pagination.limit,
      pages: Math.ceil(total / pagination.limit),
    };
  }

  async findOne(id: string): Promise<Hackathon> {
    const hackathon = await this.hackathonRepository.findOne({ where: { id } });
    if (!hackathon) {
      throw new NotFoundException(`Hackathon with ID ${id} not found`);
    }
    return hackathon;
  }

  async update(id: string, updateHackathonDto: UpdateHackathonDto): Promise<Hackathon> {
    const hackathon = await this.findOne(id);
    Object.assign(hackathon, updateHackathonDto);
    return await this.hackathonRepository.save(hackathon);
  }

  async remove(id: string): Promise<void> {
    const result = await this.hackathonRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Hackathon with ID ${id} not found`);
    }
  }
}