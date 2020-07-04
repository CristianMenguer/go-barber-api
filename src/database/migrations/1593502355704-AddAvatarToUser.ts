import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

// eslint-disable-next-line prettier/prettier
export default class AddAvatarToUser1593502355704 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'user',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user', 'avatar')
    }
}
