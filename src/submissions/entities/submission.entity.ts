import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Team } from '../../hackathons/entities/team.entity';
import { Evaluation } from '../../evaluations/entities/evaluation.entity';

export enum SubmissionStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  EVALUATED = 'evaluated'
}

@Entity('submissions')
export class Submission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('simple-json')
  fields: {
    name: string;
    link: string;
    description?: string;
  }[];

  @ManyToOne(() => Team, team => team.submissions)
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @Column()
  teamId: string;

  @Column({
    type: 'text',
    enum: SubmissionStatus,
    default: SubmissionStatus.DRAFT
  })
  status: SubmissionStatus;

  @OneToMany(() => Evaluation, evaluation => evaluation.submission)
  evaluations: Evaluation[];

  @CreateDateColumn({ type: 'datetime' })
  submittedAt: Date;
}