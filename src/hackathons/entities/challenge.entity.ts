import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Hackathon } from './hackathon.entity';
import { Team } from './team.entity';

@Entity('challenges')
export class Challenge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  criteria: string;

  @ManyToOne(() => Hackathon, (hackathon) => hackathon.challenges)
  @JoinColumn({ name: 'hackathonId' }) // This will automatically create the hackathonId column
  hackathon: Hackathon;

  @OneToMany(() => Team, (team) => team.challenge)
  teams: Team[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
