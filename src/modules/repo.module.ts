import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Mail from 'src/db/models/mail.entity';
import RepoService from 'src/services/repo.service';
import MailStatus from 'src/db/models/mail-status.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Mail, MailStatus])],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;
