import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateHostTable1601401972093 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

        await queryRunner.createTable(new Table({
            name: 'hosts',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'password',
                    type: 'varchar'
                },
                {
                    name: 'premium_validate',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'allowPedidosTrial',
                    type: 'boolean',
                    default: true
                },
                {
                    name: 'premium_type',
                    type: 'integer',
                    isNullable: true
                },
                {
                    name: 'delivery_validate',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'delivery_type',
                    type: 'integer',
                    isNullable: true
                },
                {
                    name: 'allowDeliveryTrial',
                    type: 'boolean',
                    default: true
                },
                {
                    name: 'created_at',
                    type: 'timestamp'
                },

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('hosts');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"')

    }

}
