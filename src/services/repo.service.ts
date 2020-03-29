import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Mail from 'src/entity/mail.entity';
import { Repository } from 'typeorm';
import MailStatus from 'src/entity/mail-status.entity';

@Injectable()
export default class RepoService {
  public constructor(
    @InjectRepository(Mail)
    public readonly mailRepo: Repository<Mail>,

    @InjectRepository(MailStatus)
    public readonly mailStatusRepo: Repository<MailStatus>,
  ) {}
}
