import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSessionTable1630502424520 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'sessions',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'ip',
                    type: 'varchar'
                },
                {
                    name: 'created_at',
                    type: 'timestamp'
                },

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('sessions');
    }

}
