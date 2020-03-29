import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Mail from 'src/db/models/mail.entity';
import { Repository } from 'typeorm';
import MailStatus from 'src/db/models/mail-status.entity';

@Injectable()
export default class RepoService {
  public constructor(
    @InjectRepository(Mail)
    public readonly mailRepo: Repository<Mail>,

    @InjectRepository(MailStatus)
    public readonly mailStatusRepo: Repository<MailStatus>,
  ) {}
}
