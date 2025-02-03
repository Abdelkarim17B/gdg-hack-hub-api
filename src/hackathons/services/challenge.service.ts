import { CreateChallengeDto, UpdateChallengeDto } from './../dto/challenge.dto';
import { Challenge } from './../entities/challenge.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { Hackathon } from '../entities/hackathon.entity';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private ChallengeRepository: Repository<Challenge>,
    @InjectRepository(Hackathon)
    private HackathonRepository: Repository<Hackathon>,
  ) {}

  async create(CreateChallengeDto: CreateChallengeDto, hackathonId: string): Promise<Challenge> {
    const hackathon = await this.HackathonRepository.findOne({ where: { id: hackathonId } });

    if (!hackathon) {
      throw new NotFoundException('Hackathon not found');
    }

    const challenge = this.ChallengeRepository.create({
      ...CreateChallengeDto,
      hackathon: hackathon, // ✅ Use relation instead of raw ID
    });

    return await this.ChallengeRepository.save(challenge);
  }

  async findAll(hackathonId: string, pagination: PaginationDto): Promise<{ challenges: Challenge[]; total: number; page: number; limit: number }> {
    const { page = 1, limit = 10 } = pagination;

    const [challenges, total] = await this.ChallengeRepository.findAndCount({
      where: { hackathon: { id: hackathonId } }, // ✅ Use relation
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      challenges: challenges,
      total,
      page,
      limit,
    };
  }

  async findOne(challengeId: string): Promise<Challenge> {
    const challenge = await this.ChallengeRepository.findOne({
      where: {
        id: challengeId,
      },
      relations: ['hackathon'], // ✅ Ensure relations are loaded
    });

    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }
    return challenge;
  }

  async update(updateChallengeDto: UpdateChallengeDto, id: string): Promise<Challenge> {
    const challenge = await this.ChallengeRepository.findOne({ where: { id }, relations: ['hackathon'] });

    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }

    Object.assign(challenge, updateChallengeDto);
    return await this.ChallengeRepository.save(challenge);
  }

  async delete(challengeId: string): Promise<Challenge> {
    const challenge = await this.ChallengeRepository.findOne({
      where: {
        id: challengeId,
      },
    });

    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }

    await this.ChallengeRepository.remove(challenge);
    return challenge;
  }
}
