import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Hackathon } from './hackathon.entity';

@Entity('judging_criteria')
export class JudgingCriteria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 5, scale: 2 })
  weight: number;

  @Column('decimal', { precision: 5, scale: 2 })
  maxScore: number;

  @ManyToOne(() => Hackathon, hackathon => hackathon.judgingCriteria)
  hackathon: Hackathon;

  @Column()
  hackathonId: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}