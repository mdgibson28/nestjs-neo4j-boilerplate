import { Injectable } from '@nestjs/common';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ExampleService {
  constructor(private database: DatabaseService) {}

  async create(createExampleDto: CreateExampleDto) {
    return this.database.createNode('Example', createExampleDto);
  }

  async createRelation(fromUuid: string, toUuid: string, relation: string) {
    return this.database.createRelation(fromUuid, toUuid, relation);
  }

  findAll() {
    return this.database.getNodeCount();
    // return `This action returns all example`;
  }

  findOne(id: number) {
    return `This action returns a #${id} example`;
  }

  update(id: number, updateExampleDto: UpdateExampleDto) {
    return `This action updates a #${id} example`;
  }

  remove(id: number) {
    return `This action removes a #${id} example`;
  }
}
