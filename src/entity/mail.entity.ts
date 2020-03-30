import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import MailStatus from './mail-status.entity';
@Entity({ name: 'mails_store' })
@ObjectType()
export default class Mail {
  @Field()
  @PrimaryGeneratedColumn({ type: 'uuid' })
  @Column({ name: 'mail_id', primary: true })
  id: string;

  @Column()
  @Field()
  to: string;

  @Column()
  @Field()
  from: string;

  @Column()
  @Field()
  subject: string;

  @Column()
  @Field()
  body: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;

  @OneToMany(
    () => MailStatus,
    mailStatus => mailStatus.mailConnection,
  )
  mailConnection: Promise<MailStatus>[];
}
