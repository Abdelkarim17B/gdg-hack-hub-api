import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hackathon, HackathonStatus } from '../hackathons/entities/hackathon.entity';
import { Submission } from '../submissions/entities/submission.entity';
import { Evaluation } from '../evaluations/entities/evaluation.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Hackathon)
    private readonly hackathonRepository: Repository<Hackathon>,
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getStatistics() {
    const [
      totalUsers,
      totalHackathons,
      totalSubmissions,
      totalEvaluations,
    ] = await Promise.all([
      this.userRepository.count(),
      this.hackathonRepository.count(),
      this.submissionRepository.count(),
      this.evaluationRepository.count(),
    ]);

    const activeHackathons = await this.hackathonRepository.count({
      where: { status: HackathonStatus.ACTIVE },
    });

    return {
      totalUsers,
      totalHackathons,
      activeHackathons,
      totalSubmissions,
      totalEvaluations,
    };
  }

  async getRecentActivities() {
    const recentSubmissions = await this.submissionRepository.find({
      relations: ['team', 'team.hackathon'],
      order: { submittedAt: 'DESC' },
      take: 5,
    });

    const recentEvaluations = await this.evaluationRepository.find({
      relations: ['judge', 'submission'],
      order: { evaluatedAt: 'DESC' },
      take: 5,
    });

    return {
      recentSubmissions,
      recentEvaluations,
    };
  }

  async getHackathonMetrics() {
    const hackathons = await this.hackathonRepository.find();
    const metrics = [];

    for (const hackathon of hackathons) {
      const submissions = await this.submissionRepository.count({
        where: { team: { hackathonId: hackathon.id } }
      });

      const evaluations = await this.evaluationRepository
        .createQueryBuilder('evaluation')
        .leftJoin('evaluation.submission', 'submission')
        .leftJoin('submission.team', 'team')
        .where('team.hackathonId = :hackathonId', { hackathonId: hackathon.id })
        .getCount();

      metrics.push({
        hackathonId: hackathon.id,
        title: hackathon.title,
        status: hackathon.status,
        submissions,
        evaluations,
        participationRate: hackathon.maxTeamSize
          ? (submissions / hackathon.maxTeamSize) * 100
          : 0,
      });
    }

    return metrics;
  }
}