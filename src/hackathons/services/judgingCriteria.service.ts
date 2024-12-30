import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { JudgingCriteria } from '../entities/judging-criteria.entity';
import { CreateJudgingCriteriaDto } from '../dto/judging-criteria.dto';

@Injectable()
export class JudgingCriteriaService {
    constructor(
        @InjectRepository(JudgingCriteria)
        private JudgingCriteriaRepository: Repository<JudgingCriteria>,
      ) {}
  async create(CreateJudgingCriteriaDto: CreateJudgingCriteriaDto, hackathonId: string): Promise<JudgingCriteria> {
    const JudgingCriteria = this.JudgingCriteriaRepository.create({ ...CreateJudgingCriteriaDto,hackathonId: hackathonId });
    return await this.JudgingCriteriaRepository.save(JudgingCriteria);
    }

    async findAll(hackathonId: string, pagination: PaginationDto): Promise<{ JudgingCriterias: JudgingCriteria[], total: number, page: number, limit: number }> {
     
        const { page = 1, limit = 10 } = pagination;
        const [JudgingCriterias, total] = await this.JudgingCriteriaRepository.findAndCount({
          where: { hackathonId },
          take: limit,
          skip: (page - 1) * limit
        })
  
        return {
          JudgingCriterias: JudgingCriterias,
          total,
          page,
          limit
        };   
     }
    async findOne(JudgingCriteriaId: string): Promise<JudgingCriteria> {
        const JudgingCriteria = await this.JudgingCriteriaRepository.findOne({
            where: {
                id: JudgingCriteriaId
            }
        });

        if (!JudgingCriteria) {
            throw new NotFoundException('JudgingCriteria not found');
        }
        return JudgingCriteria;
    }
    async update(updateJudgingCriteriaDto: CreateJudgingCriteriaDto, id: string): Promise<JudgingCriteria> {
        const JudgingCriteria = await this.JudgingCriteriaRepository.findOne({ where: { id } });

        if (!JudgingCriteria) {
            throw new NotFoundException('JudgingCriteria not found');
        }

        Object.assign(JudgingCriteria, updateJudgingCriteriaDto);
        return await this.JudgingCriteriaRepository.save(JudgingCriteria)
    }

    async delete(JudgingCriteriaId: string): Promise<JudgingCriteria> {
        const JudgingCriteria = await this.JudgingCriteriaRepository.findOne({
            where: {
                id: JudgingCriteriaId
            }
        });

        if (!JudgingCriteria) {
            throw new NotFoundException('JudgingCriteria not found');
        }

        await this.JudgingCriteriaRepository.remove(JudgingCriteria);
        return JudgingCriteria;
    }

    

}