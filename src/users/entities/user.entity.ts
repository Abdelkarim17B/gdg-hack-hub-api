import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Role } from '../../common/enums/role.enum';
import { Evaluation } from '../../evaluations/entities/evaluation.entity';
import { JudgeAssignment } from '../../hackathons/entities/judge-assignment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'text',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column()
  name: string;

  @OneToMany(() => JudgeAssignment, assignment => assignment.judge)
  judgeAssignments: JudgeAssignment[];

  @OneToMany(() => Evaluation, evaluation => evaluation.judge)
  evaluations: Evaluation[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}