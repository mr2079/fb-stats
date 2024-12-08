import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchema1733681272052 implements MigrationInterface {
    name = 'UpdateSchema1733681272052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "team" ("id" SERIAL NOT NULL, "fetchId" character varying NOT NULL, "name" character varying NOT NULL, "title" character varying NOT NULL, "logo" character varying NOT NULL, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "competition" ("id" SERIAL NOT NULL, "fetchId" character varying NOT NULL, "name" character varying NOT NULL, "title" character varying NOT NULL, "logo" character varying NOT NULL, CONSTRAINT "PK_a52a6248db574777b226e9445bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team_competitions_competition" ("teamId" integer NOT NULL, "competitionId" integer NOT NULL, CONSTRAINT "PK_cdbe2be90f58746cb9c2a97ac00" PRIMARY KEY ("teamId", "competitionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2dd9344d8df6b44de5c39748eb" ON "team_competitions_competition" ("teamId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fb7c1cfd125cace78a52c891d6" ON "team_competitions_competition" ("competitionId") `);
        await queryRunner.query(`ALTER TABLE "team_competitions_competition" ADD CONSTRAINT "FK_2dd9344d8df6b44de5c39748eb4" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "team_competitions_competition" ADD CONSTRAINT "FK_fb7c1cfd125cace78a52c891d62" FOREIGN KEY ("competitionId") REFERENCES "competition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_competitions_competition" DROP CONSTRAINT "FK_fb7c1cfd125cace78a52c891d62"`);
        await queryRunner.query(`ALTER TABLE "team_competitions_competition" DROP CONSTRAINT "FK_2dd9344d8df6b44de5c39748eb4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb7c1cfd125cace78a52c891d6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2dd9344d8df6b44de5c39748eb"`);
        await queryRunner.query(`DROP TABLE "team_competitions_competition"`);
        await queryRunner.query(`DROP TABLE "competition"`);
        await queryRunner.query(`DROP TABLE "team"`);
    }

}
