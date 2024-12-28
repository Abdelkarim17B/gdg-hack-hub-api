import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { Challenge } from '../entities/challenge.entity';
import { Hackathon } from '../entities/hackathon.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { User } from 'src/users/entities/user.entity';

interface TeamRegistrationData {
  teamName: string;
  memberEmails: string[];
  challengeId: string;
}

@Injectable()
export class TeamRegistrationService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>,
    @InjectRepository(Hackathon)
    private readonly hackathonRepository: Repository<Hackathon>,
    @InjectRepository(User)
    private readonly UserRepository :Repository<User>
  ) {}

  async registerTeamsFromSheet(hackathonId: string, registrationData: TeamRegistrationData[]): Promise<Team[]> {
    const hackathon = await this.hackathonRepository.findOne({ 
      where: { id: hackathonId } 
    });

    if (!hackathon) {
      throw new BadRequestException(`Hackathon with ID ${hackathonId} not found`);
    }

    // Validate team sizes
    for (const data of registrationData) {
      if (data.memberEmails.length < hackathon.minTeamSize || 
          data.memberEmails.length > hackathon.maxTeamSize) {
        throw new BadRequestException(
          `Team ${data.teamName} size must be between ${hackathon.minTeamSize} and ${hackathon.maxTeamSize}`
        );
      }
    }

    // Validate all challenges exist
    const challengeIds = [...new Set(registrationData.map(data => data.challengeId))];
    const challenges = await this.challengeRepository.findByIds(challengeIds);
    
    if (challenges.length !== challengeIds.length) {
      throw new BadRequestException('One or more challenge IDs are invalid');
    }

    // Create teams
    const teams = registrationData.map(data => this.teamRepository.create({
      name: data.teamName,
      memberEmails: data.memberEmails,
      hackathonId,
      challengeId: data.challengeId
    }))

    return await this.teamRepository.save(teams);
  }

  async validateTeamRegistration(hackathonId: string, memberEmails: string[]): Promise<boolean> {
    // Check if any email is already registered in another team for this hackathon
    const existingTeams = await this.teamRepository.find({
      where: { hackathonId }
    });

    const registeredEmails = new Set(
      existingTeams.flatMap(team => team.memberEmails)
    );

    return !memberEmails.some(email => registeredEmails.has(email));
  }

 async getAllTeams(hackathonId: string, pagination: PaginationDto) {
    try {
      const hackathon = await this.hackathonRepository.findOne({
        where: {
          id: hackathonId
        }
      });

      if (!hackathon) {
        throw new NotFoundException('Hackathon not found');
      }

      const { page = 1, limit = 10 } = pagination;
      const [teams, total] = await this.teamRepository.findAndCount({
        where: { hackathonId },
        take: limit,
        skip: (page - 1) * limit
      })

      return {
        data: teams,
        total,
        page,
        limit
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async addParticipantToTeam(hackathonId: string, teamId: string, participantId: string): Promise<void> {

    const user =await this.UserRepository.findOne({
      where:{
        id:participantId
      }
    })
    if(!user){
      throw new NotFoundException('participant not found')
    }
    const alreadyNotInTeam=await this.validateTeamRegistration(hackathonId,[user.email])
    if(!alreadyNotInTeam){
      throw new BadRequestException('Participant is already registered in another team for this hackathon');
    }
    const team = await this.teamRepository.findOne({ where: { id: teamId, hackathonId } });

    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found in hackathon ${hackathonId}`);
    }

    if (team.memberEmails.includes(participantId)) {
      throw new BadRequestException(`Participant with ID ${participantId} is already in the team`)
    }

    team.memberEmails.push(participantId);
    await this.teamRepository.save(team)
    // Participant added to team successfully
  }
}