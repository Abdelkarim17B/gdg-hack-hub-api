import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Hackathon } from './hackathon.entity';
import { User } from '../../users/entities/user.entity';

@Entity('judge_assignments')
export class JudgeAssignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Hackathon, hackathon => hackathon.judgeAssignments)
  hackathon: Hackathon;

  @Column()
  hackathonId: string;

  @ManyToOne(() => User, user => user.judgeAssignments)
  judge: User;

  @Column()
  judgeId: string;

  @CreateDateColumn({ type: 'datetime' })
  assignedAt: Date;
}