import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Submission } from '../../submissions/entities/submission.entity';
import { JudgingCriteria } from '../../hackathons/entities/judging-criteria.entity';

@Entity('evaluations')
export class Evaluation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Submission, submission => submission.evaluations)
  @JoinColumn({ name: 'submissionId' }) // ✅ Ensures correct FK name
  submission: Submission;

  @ManyToOne(() => User, user => user.evaluations)
  @JoinColumn({ name: 'judgeId' }) // ✅ Ensures correct FK name
  judge: User;

  @ManyToOne(() => JudgingCriteria)
  @JoinColumn({ name: 'criteriaId' }) // ✅ Ensures correct FK name
  criteria: JudgingCriteria;

  @Column('decimal', { precision: 5, scale: 2 })
  score: number;

  @Column('text')
  feedback: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  evaluatedAt: Date;
}
