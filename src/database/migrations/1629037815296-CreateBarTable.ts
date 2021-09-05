import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBarTable1629037815296 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'bares',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'hostId',
                    type: 'uuid'
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type: 'varchar'
                },
                {
                    name: 'address',
                    type: 'varchar',
                },
                {
                    name: 'open',
                    type: 'varchar',
                },
                {
                    name: 'color',
                    type: 'varchar',
                },
                {
                    name: 'photo_url',
                    type: 'varchar',
                },
                {
                    name: 'type',
                    type: 'varchar'
                },
                {
                    name: 'active',
                    type: 'boolean',
                },
                {
                    name: 'mesas',
                    type: 'integer',
                    isNullable: true
                },
                {
                    name: 'allowObs',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'telefone',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'created_at',
                    type: 'timestamp'
                },

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('bares');
    }

}
