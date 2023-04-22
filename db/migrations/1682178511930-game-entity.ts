import { MigrationInterface, QueryRunner } from 'typeorm';

export class gameEntity1682178511930 implements MigrationInterface {
  name = 'gameEntity1682178511930';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "game" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "platforms" character array NOT NULL, "company" character varying NOT NULL, "genres" character array NOT NULL, "release_date" character varying NOT NULL, "rating" integer NOT NULL, "cover" character varying NOT NULL, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
