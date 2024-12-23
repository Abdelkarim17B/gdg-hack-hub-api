import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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

  @ManyToOne(() => Hackathon, hackathon => hackathon.challenges)
  hackathon: Hackathon;

  @Column()
  hackathonId: string;

  @OneToMany(() => Team, team => team.challenge)
  teams: Team[];

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}