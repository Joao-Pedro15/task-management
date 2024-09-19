import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1726777235000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "user" (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            username VARCHAR(256) NOT NULL,
            password_hash VARCHAR(256) NOT NULL,
            CONSTRAINT user_pk_id PRIMARY KEY (id),
            CONSTRAINT user_un_username UNIQUE (username) 
        );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS user;`)
    }

}
