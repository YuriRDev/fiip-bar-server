import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAdicionaisTable1630277911110 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'adicionais',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'barId',
                    type: 'uuid'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type: 'varchar'
                },
                {
                    name: 'price',
                    type: 'float'
                },
                {
                    name: 'created_at',
                    type: 'timestamp'
                },


            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('adicionais');
    }

}
