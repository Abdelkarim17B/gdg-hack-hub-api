import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Submission } from '../../submissions/entities/submission.entity';
import { JudgingCriteria } from '../../hackathons/entities/judging-criteria.entity';

@Entity('evaluations')
export class Evaluation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Submission, submission => submission.evaluations)
  @JoinColumn({ name: 'submission_id' })
  submission: Submission;

  @Column()
  submissionId: string;

  @ManyToOne(() => User, user => user.evaluations)
  @JoinColumn({ name: 'judge_id' })
  judge: User;

  @Column()
  judgeId: string;

  @ManyToOne(() => JudgingCriteria)
  @JoinColumn({ name: 'criteria_id' })
  criteria: JudgingCriteria;

  @Column()
  criteriaId: string;

  @Column('decimal', { precision: 5, scale: 2 })
  score: number;

  @Column('text')
  feedback: string;

  @CreateDateColumn({ type: 'datetime' })
  evaluatedAt: Date;
}