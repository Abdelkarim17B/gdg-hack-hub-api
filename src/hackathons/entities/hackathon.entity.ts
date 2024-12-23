import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Challenge } from './challenge.entity';
import { Team } from './team.entity';
import { JudgeAssignment } from './judge-assignment.entity';
import { JudgingCriteria } from './judging-criteria.entity';

export enum HackathonStatus {
  DRAFT = 'draft',
  REGISTRATION = 'registration',
  ACTIVE = 'active',
  JUDGING = 'judging',
  COMPLETED = 'completed'
}

@Entity('hackathons')
export class Hackathon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('datetime')
  startDate: Date;

  @Column('datetime')
  endDate: Date;

  @Column('datetime')
  registrationDeadline: Date;

  @Column()
  maxTeamSize: number;

  @Column()
  minTeamSize: number;

  @Column({
    type: 'text',
    enum: HackathonStatus,
    default: HackathonStatus.DRAFT,
  })
  status: HackathonStatus;

  @Column('text')
  rules: string;

  @Column('text')
  prizes: string;

  @OneToMany(() => Challenge, challenge => challenge.hackathon)
  challenges: Challenge[];

  @OneToMany(() => Team, team => team.hackathon)
  teams: Team[];

  @OneToMany(() => JudgeAssignment, assignment => assignment.hackathon)
  judgeAssignments: JudgeAssignment[];

  @OneToMany(() => JudgingCriteria, criteria => criteria.hackathon)
  judgingCriteria: JudgingCriteria[];

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}