import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchema1733769376592 implements MigrationInterface {
    name = 'UpdateSchema1733769376592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "team" ("id" SERIAL NOT NULL, "fetchId" character varying NOT NULL, "name" character varying NOT NULL, "title" character varying NOT NULL, "logo" character varying NOT NULL, "competitionId" integer NOT NULL, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "competition" ("id" SERIAL NOT NULL, "fetchId" character varying NOT NULL, "name" character varying NOT NULL, "title" character varying NOT NULL, "logo" character varying NOT NULL, CONSTRAINT "PK_a52a6248db574777b226e9445bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_9dafc3d6797a52ea4150fcc946e" FOREIGN KEY ("competitionId") REFERENCES "competition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_9dafc3d6797a52ea4150fcc946e"`);
        await queryRunner.query(`DROP TABLE "competition"`);
        await queryRunner.query(`DROP TABLE "team"`);
    }

}
