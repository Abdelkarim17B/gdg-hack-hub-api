import { CreateChallengeDto, UpdateChallengeDto } from './../dto/challenge.dto';
import { Challenge } from './../entities/challenge.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ChallengeService {
    constructor(
        @InjectRepository(Challenge)
        private ChallengeRepository: Repository<Challenge>,
      ) {}
  async create(CreateChallengeDto: CreateChallengeDto, hackathonId: string): Promise<Challenge> {
    const challenge = this.ChallengeRepository.create({ ...CreateChallengeDto,hackathonId: hackathonId });
    return await this.ChallengeRepository.save(challenge);
    }

    async findAll(hackathonId: string, pagination: PaginationDto): Promise<{ challenges: Challenge[], total: number, page: number, limit: number }> {
     
        const { page = 1, limit = 10 } = pagination;
        const [challenges, total] = await this.ChallengeRepository.findAndCount({
          where: { hackathonId },
          take: limit,
          skip: (page - 1) * limit
        })
  
        return {
          challenges: challenges,
          total,
          page,
          limit
        };   
     }
    async findOne(challengeId: string): Promise<Challenge> {
        const challenge = await this.ChallengeRepository.findOne({
            where: {
                id: challengeId
            }
        });

        if (!challenge) {
            throw new NotFoundException('challenge not found');
        }
        return challenge;
    }
    async update(updateChallengeDto: UpdateChallengeDto, id: string): Promise<Challenge> {
        const challenge = await this.ChallengeRepository.findOne({ where: { id } });

        if (!challenge) {
            throw new NotFoundException('challenge not found');
        }

        Object.assign(challenge, updateChallengeDto);
        return await this.ChallengeRepository.save(challenge)
    }

    async delete(challengeId: string): Promise<Challenge> {
        const challenge = await this.ChallengeRepository.findOne({
            where: {
                id: challengeId
            }
        });

        if (!challenge) {
            throw new NotFoundException('challenge not found');
        }

        await this.ChallengeRepository.remove(challenge);
        return challenge;
    }

    

}