import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1738541456172 implements MigrationInterface {
    name = 'InitialSchema1738541456172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "challenges" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "criteria" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "hackathon_id" uuid, CONSTRAINT "PK_1e664e93171e20fe4d6125466af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "judge_assignments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hackathon_id" uuid NOT NULL, "judge_id" uuid NOT NULL, "assigned_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b2f2a5dac77c026cc260a7d7df5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "judging_criteria" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "weight" numeric(5,2) NOT NULL, "max_score" numeric(5,2) NOT NULL, "hackathon_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_277e14f433ad26e3b9a8162e679" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hackathons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "location" text, "theme" text, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "end_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "registration_deadline" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "max_team_size" integer NOT NULL, "min_team_size" integer NOT NULL, "status" text NOT NULL DEFAULT 'draft', "rules" text NOT NULL, "prizes" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b290177bd925b16bf35bf59961b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teams" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "hackathon_id" uuid NOT NULL, "challenge_id" uuid, "member_emails" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "submissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "fields" text NOT NULL, "status" text NOT NULL DEFAULT 'draft', "submitted_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "team_id" uuid, CONSTRAINT "PK_10b3be95b8b2fb1e482e07d706b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "evaluations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "score" numeric(5,2) NOT NULL, "feedback" text NOT NULL, "evaluated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "submission_id" uuid, "judge_id" uuid, "criteria_id" uuid, CONSTRAINT "PK_f683b433eba0e6dae7e19b29e29" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "role" text NOT NULL DEFAULT 'user', "name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "challenges" ADD CONSTRAINT "FK_b52768991e4d01252e1d3f41b13" FOREIGN KEY ("hackathon_id") REFERENCES "hackathons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "judge_assignments" ADD CONSTRAINT "FK_5a0d7595423c5c597869ec4abba" FOREIGN KEY ("hackathon_id") REFERENCES "hackathons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "judge_assignments" ADD CONSTRAINT "FK_960f6e37b18343355c63e4f6876" FOREIGN KEY ("judge_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "judging_criteria" ADD CONSTRAINT "FK_88f330b4e8d262163634a34eae6" FOREIGN KEY ("hackathon_id") REFERENCES "hackathons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "FK_a12299ca7e9da6211ea6bb4cc34" FOREIGN KEY ("hackathon_id") REFERENCES "hackathons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "FK_c395fd87f59bd9159f297bb651d" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD CONSTRAINT "FK_744e0ddbe7ee244176b7bd1dd44" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evaluations" ADD CONSTRAINT "FK_de43922d2ba87818005fb8edb27" FOREIGN KEY ("submission_id") REFERENCES "submissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evaluations" ADD CONSTRAINT "FK_4949ffadc865cb5d79662522443" FOREIGN KEY ("judge_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evaluations" ADD CONSTRAINT "FK_c4d813a6dc87deeba2576b4899c" FOREIGN KEY ("criteria_id") REFERENCES "judging_criteria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "evaluations" DROP CONSTRAINT "FK_c4d813a6dc87deeba2576b4899c"`);
        await queryRunner.query(`ALTER TABLE "evaluations" DROP CONSTRAINT "FK_4949ffadc865cb5d79662522443"`);
        await queryRunner.query(`ALTER TABLE "evaluations" DROP CONSTRAINT "FK_de43922d2ba87818005fb8edb27"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP CONSTRAINT "FK_744e0ddbe7ee244176b7bd1dd44"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "FK_c395fd87f59bd9159f297bb651d"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "FK_a12299ca7e9da6211ea6bb4cc34"`);
        await queryRunner.query(`ALTER TABLE "judging_criteria" DROP CONSTRAINT "FK_88f330b4e8d262163634a34eae6"`);
        await queryRunner.query(`ALTER TABLE "judge_assignments" DROP CONSTRAINT "FK_960f6e37b18343355c63e4f6876"`);
        await queryRunner.query(`ALTER TABLE "judge_assignments" DROP CONSTRAINT "FK_5a0d7595423c5c597869ec4abba"`);
        await queryRunner.query(`ALTER TABLE "challenges" DROP CONSTRAINT "FK_b52768991e4d01252e1d3f41b13"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "evaluations"`);
        await queryRunner.query(`DROP TABLE "submissions"`);
        await queryRunner.query(`DROP TABLE "teams"`);
        await queryRunner.query(`DROP TABLE "hackathons"`);
        await queryRunner.query(`DROP TABLE "judging_criteria"`);
        await queryRunner.query(`DROP TABLE "judge_assignments"`);
        await queryRunner.query(`DROP TABLE "challenges"`);
    }

}
