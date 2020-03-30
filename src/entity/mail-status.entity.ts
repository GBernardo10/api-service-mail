import { Field, ObjectType } from '@nestjs/graphql';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Mail from './mail.entity';
@Entity({ name: 'mail_status' })
@ObjectType()
export default class MailStatus {
  @Field()
  @PrimaryGeneratedColumn({ type: 'uuid'})
  @Column({name:"id_status",primary:true})
  id: string;

  @Field()
  @Column({ enum: ['ready', 'stage', 'err'], type: 'enum' })
  status: string;

  @Field()
  @Column({ name: 'fk_mail_id' })
  mailId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;

  @Field(() => Mail)
  mail: Mail;

  @ManyToOne(
    () => Mail,
    mail => mail.mailConnection,
    { primary: true },
  )
  @JoinColumn({ name: 'fk_mail_id' })
  mailConnection: Promise<Mail>;
}
