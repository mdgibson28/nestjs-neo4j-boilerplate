import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class DatabaseService {
  constructor(private readonly database: Neo4jService) {}

  async getNodeCount(): Promise<number> {
    const res = await this.database.read(`MATCH (n) RETURN count(n) AS count`);
    return res.records[0].get('count');
  }
}
