import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoModule from './modules/repo.module';

@Module({
  imports: [TypeOrmModule.forRoot(), RepoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
