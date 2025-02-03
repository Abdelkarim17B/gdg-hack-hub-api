import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Hackathon } from './hackathon.entity';
import { Challenge } from './challenge.entity';
import { User } from '../../users/entities/user.entity';
import { Submission } from '../../submissions/entities/submission.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Hackathon, hackathon => hackathon.teams)
  hackathon: Hackathon;

  @Column()
  hackathonId: string;

  @ManyToOne(() => Challenge, challenge => challenge.teams)
  challenge: Challenge;

  @Column()
  @Column({ nullable: true })
  challengeId: string;

  @OneToMany(() => Submission, submission => submission.team)
  submissions: Submission[];

  @Column('simple-array')
  memberEmails: string[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}