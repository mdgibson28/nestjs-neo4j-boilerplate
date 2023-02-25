import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { createValuesString } from './utils/create-values-string.util';

@Injectable()
export class DatabaseService {
  constructor(private readonly database: Neo4jService) {}

  async getNodeCount(): Promise<number> {
    const res = await this.database.read(`MATCH (n) RETURN count(n) AS count`);
    return res.records[0].get('count');
  }

  async createNode(type: string, data: object) {
    const res = await this.database.write(
      `CREATE (n:${type} ${createValuesString(data)}) RETURN n`,
      data,
    );
    return res.records[0].get('n');
  }

  async createRelation(
    fromType: string,
    fromUuid: string,
    toType: string,
    toUuid: string,
    relation: string,
  ): Promise<any> {
    return await this.database.write(
      `MATCH (a:${fromType} {uuid: $fromUuid}), (b:${toType} {uuid: $toUuid})
      CREATE (a)-[r:${relation}]->(b)
      RETURN r`,
      { fromUuid, toUuid },
    );
  }

  async updateNode(type: string, uuid: string, data: object) {
    const res = await this.database.write(
      `MATCH (n:${type} {uuid: $uuid}) SET n += ${createValuesString(
        data,
      )} RETURN n`,
      { uuid, ...data },
    );
    return res.records[0].get('n');
  }

  async findAll(type: string) {
    const res = await this.database.read(`MATCH (n:${type}) RETURN n`);
    return res.records.map((record) => record.get('n'));
  }

  async findOne(type: string, uuid: string) {
    const res = await this.database.read(
      `MATCH (n:${type} {uuid: $uuid}) RETURN n`,
      { uuid },
    );
    return res.records[0].get('n');
  }

  async deleteNode(type: string, uuid: string) {
    return await this.database.write(
      `MATCH (n:${type} {uuid: $uuid}) DETACH DELETE n`,
      { uuid },
    );
  }
}
