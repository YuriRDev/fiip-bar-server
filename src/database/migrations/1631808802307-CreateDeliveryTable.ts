import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDeliveryTable1631808802307 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'delivery',
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
                    name: 'sessionId',
                    type: 'uuid'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'phone',
                    type: 'varchar'
                },
                {
                    name: 'items',
                    type: 'varchar'
                },
                {
                    name: 'cep',
                    type: 'varchar',
                },
                {
                    name: 'address',
                    type: 'varchar'
                },
                {
                    name: 'number',
                    type: 'varchar'
                },
                {
                    name: 'complemento',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'status',
                    type: 'integer'
                },
                {
                    name: 'payment',
                    type: 'varchar'
                },
                {
                    name: 'troco',
                    type: 'integer',
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
        await queryRunner.dropTable('delivery');
    }

}
