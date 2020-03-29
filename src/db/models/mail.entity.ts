import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import MailStatus from './mail-status.entity';

@Entity()
@ObjectType()
export default class Mail {
  @Field()
  @PrimaryGeneratedColumn({ type: 'uuid', name: 'mail_id' })
  @PrimaryColumn()
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

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @OneToMany(
    () => MailStatus,
    mailStatus => mailStatus.mailConnection,
  )
  mailConnection: Promise<MailStatus>[];
}
