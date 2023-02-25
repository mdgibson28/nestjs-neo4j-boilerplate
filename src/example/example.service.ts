import { Injectable } from '@nestjs/common';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { DatabaseService } from 'src/database/database.service';
import { Example } from './entities/example.entity';

@Injectable()
export class ExampleService {
  constructor(private database: DatabaseService) {}

  async create(createExampleDto: CreateExampleDto) {
    return this.database.createNode('Example', createExampleDto);
  }

  async createRelation(fromUuid: string, toUuid: string, relation: string) {
    return this.database.createRelation(
      'Example',
      fromUuid,
      'Example',
      toUuid,
      relation,
    );
  }

  async findAll() {
    return this.database.findAll('Example');
  }

  async findOne(uuid: string) {
    return this.database.findOne('Example', uuid);
  }

  async update(uuid: string, updateExampleDto: UpdateExampleDto) {
    return this.database.updateNode('Example', uuid, updateExampleDto);
  }

  async remove(uuid: string) {
    return this.database.deleteNode('Example', uuid);
  }
}
