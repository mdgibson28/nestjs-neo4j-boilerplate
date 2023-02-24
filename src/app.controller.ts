import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Controller()
export class AppController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  async getHello(): Promise<any> {
    const count = await this.database.getNodeCount();
    return `There are ${count} nodes in the database.`;
  }
}
