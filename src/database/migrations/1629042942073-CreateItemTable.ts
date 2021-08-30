import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateItemTable1629042942073 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'items',
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
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'price',
                    type: 'float',
                },
                {
                    name: 'index',
                    type: 'integer'
                },
                {
                    name: 'photo_url',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'adicionais',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'categoriaId',
                    type: 'uuid',
                },
                {
                    name: 'created_at',
                    type: 'timestamp'
                },

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('items');
    }

}
