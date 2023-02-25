import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { CreateExampleDto } from 'src/example/dto/create-example.dto';

@Injectable()
export class DatabaseService {
  constructor(private readonly database: Neo4jService) {}

  async getNodeCount(): Promise<number> {
    const res = await this.database.read(`MATCH (n) RETURN count(n) AS count`);
    return res.records[0].get('count');
  }

  async createNode(label: string, data: object) {
    let values = '{';
    for (const key in data) {
      values += `${key}: $${key}, `;
    }
    values = values.slice(0, -2);
    values += '}';

    const res = await this.database.write(
      `CREATE (n:${label} ${values}) RETURN n`,
      data,
    );
    return res.records[0].get('n');
  }

  async createRelation(
    fromUuid: string,
    toUuid: string,
    relation: string,
  ): Promise<void> {
    await this.database.write(
      `MATCH (a:Example {uuid: $fromUuid}), (b:Example {uuid: $toUuid})
      CREATE (a)-[r:${relation}]->(b)
      RETURN r`,
      { fromUuid, toUuid },
    );
  }
}
