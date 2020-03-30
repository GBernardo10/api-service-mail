import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import RepoModule from './modules/repo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';
import MailResolver from './resolvers/mail.resolvers';
import { GraphQLModule } from '@nestjs/graphql';
import MailStatusResolver from './resolvers/mail-status.resolvers';
config();

const gqlImports = [MailResolver, MailStatusResolver];
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      port: Number(process.env.TYPEORM_PORT),
      host: process.env.TYPEORM_HOST,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
    }),
    ...gqlImports,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    RepoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
