import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePedidosTable1630280334146 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'pedidos',
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
                    name: 'mesa',
                    type: 'integer',
                    isNullable: true
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
        await queryRunner.dropTable('pedidos');
    }

}
