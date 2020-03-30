import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import RepoService from 'src/services/repo.service';
import Mail from 'src/entity/mail.entity';
import MailInput from './input/mail.input';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => Mail)
export default class MailResolver {
  constructor(private repoService: RepoService) {}

  @Query(() => [Mail])
  public async mails(): Promise<Mail[]> {
    return this.repoService.mailRepo.find();
  }

  @Mutation(() => Mail)
  public async createEmail(@Args('data') input: MailInput): Promise<Mail> {
    const mail = this.repoService.mailRepo.create({
      to: input.to,
      from: input.from,
      subject: input.subject,
      body: input.body,
    });
    const t = mail.to;
    if (!t.length) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
    return this.repoService.mailRepo.save(mail);
  }
}
