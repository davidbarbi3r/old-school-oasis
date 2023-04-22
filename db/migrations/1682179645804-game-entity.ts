import { MigrationInterface, QueryRunner } from 'typeorm';

export class gameEntity1682179645804 implements MigrationInterface {
  name = 'gameEntity1682179645804';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "platforms"`);
    await queryRunner.query(
      `ALTER TABLE "game" ADD "platforms" character varying array NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "genres"`);
    await queryRunner.query(
      `ALTER TABLE "game" ADD "genres" character varying array NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "release_date"`);
    await queryRunner.query(
      `ALTER TABLE "game" ADD "release_date" TIMESTAMP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "release_date"`);
    await queryRunner.query(
      `ALTER TABLE "game" ADD "release_date" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "genres"`);
    await queryRunner.query(
      `ALTER TABLE "game" ADD "genres" character array NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "platforms"`);
    await queryRunner.query(
      `ALTER TABLE "game" ADD "platforms" character array NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
