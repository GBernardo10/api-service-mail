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
        default: 'uuid_generate_v4()',
        isPrimary: true,
      },
      {
        name: 'status',
        type: 'text',
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
    await queryRunner.query(`DROP TYPE IF EXISTS enum;`)
    await queryRunner.query(
      `CREATE TYPE enum AS ENUM ('ready', 'stage', 'err')`,
    );
    await queryRunner.query(`
    ALTER TABLE mail_status
      ALTER COLUMN status DROP DEFAULT,
      ALTER COLUMN status
        SET DATA TYPE enum
        USING status::text::enum,
        ALTER COLUMN status SET DEFAULT 'stage';`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.table);
  }
}
