import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class MailStatus1585458675644 implements MigrationInterface {

  private table = new Table({
    name: 'mail_status',
    columns: [
      {
        name: 'id_status',
        type: 'uuid',
        generationStrategy: 'uuid',
        default:"uuid_generate_v4()",
        isPrimary: true,
      },
      {
        name: 'status',
        type: 'varchar',
        enum: ['ready', 'stage', 'err'],
        isNullable: false,
      },
      {
        name: 'fk_mail_id',
        type: 'uuid',
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

  private foreignKey = new TableForeignKey({
    columnNames: ['fk_mail_id'],
    referencedColumnNames: ['mail_id'],
    referencedTableName: 'mails_store',
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey('mail_status', this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.table);
  }
}
