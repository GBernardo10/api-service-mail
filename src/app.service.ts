import { Injectable} from '@nestjs/common';
import RepoService from './services/repo.service';

@Injectable()
export class AppService {
  constructor(private readonly repoService: RepoService) {}

  async getHello(): Promise<string> {
    return `Total de email com erros: ${await this.repoService.mailStatusRepo.count()}`;
  }
}
