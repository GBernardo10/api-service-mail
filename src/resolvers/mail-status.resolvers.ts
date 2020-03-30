import {
  Resolver,
  Query,
  Args,
  Mutation,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import RepoService from 'src/services/repo.service';
import MailStatus from 'src/entity/mail-status.entity';
import MailStatusInput from './input/mail-status.input';
import Mail from 'src/entity/mail.entity';

@Resolver(() => MailStatus)
export default class MailStatusResolver {
  constructor(private repoService: RepoService) {}

  @Query(() => [MailStatus])
  public async MailStatus(): Promise<MailStatus[]> {
    return this.repoService.mailStatusRepo.find();
  }

  @Query(() => [MailStatus], { nullable: true })
  public async getStatus(
    @Args('status') status: string,
  ): Promise<MailStatus[]> {
    return this.repoService.mailStatusRepo.find({
      where: { status },
    });
  }

  @Mutation(() => MailStatus)
  public async createEMailStatus(
    @Args('data') input: MailStatusInput,
  ): Promise<MailStatus> {
    const MailStatus = this.repoService.mailStatusRepo.create({
      mailId: input.mail.connect.id,
      status:input.status
    });
    return this.repoService.mailStatusRepo.save(MailStatus);
  }

  @ResolveField(() => Mail)
  public async getMail(@Parent() parent: MailStatus): Promise<Mail> {
    return this.repoService.mailRepo.findOne(parent.mailId);
  }
}
