import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey
} from 'typeorm'

// eslint-disable-next-line prettier/prettier
export default class AlterProviderToProviderId1593161480926 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointment', 'provider')

        await queryRunner.addColumn(
            'appointment',
            new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true
            })
        )

        await queryRunner.createForeignKey(
            'appointment',
            new TableForeignKey({
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
                name: 'AppointmentProvider'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointment', 'AppointmentProvider')

        await queryRunner.dropColumn('appointment', 'provider_id')

        await queryRunner.addColumn(
            'appointment',
            new TableColumn({
                name: 'provider',
                type: 'varchar'
            })
        )
    }
}
