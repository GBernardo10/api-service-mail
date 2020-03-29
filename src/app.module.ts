import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ormOptions from './config/orm';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoModule from './modules/repo.module';
import { AppConfigModule } from './config/app/config.module';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forRoot(ormOptions), RepoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
