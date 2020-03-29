import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class MailStore1585452469733 implements MigrationInterface {
  private table = new Table({
    name: 'mails_store',
    columns: [
      {
        name: 'mail_id',
        type: 'uuid',
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
        isPrimary: true,
      },
      {
        name: 'to',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'from',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'subject',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'body',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.table);
  }
}
