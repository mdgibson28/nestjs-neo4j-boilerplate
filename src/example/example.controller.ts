import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ExampleService } from './example.service';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  async create(@Body() createExampleDto: CreateExampleDto) {
    return this.exampleService.create(createExampleDto);
  }

  @Post('relation')
  async createRelation(
    @Body() body: { fromUuid: string; toUuid: string; relation: string },
  ) {
    if (!body.fromUuid || !body.toUuid || !body.relation) {
      throw new HttpException(
        'startUuid, endUuid, and relation are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.exampleService.createRelation(
      body.fromUuid,
      body.toUuid,
      body.relation,
    );
  }

  @Get()
  async findAll() {
    const count = await this.exampleService.findAll();
    return `There are ${count} nodes in the database.`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exampleService.findOne(+id);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updateExampleDto: UpdateExampleDto,
  ) {
    return this.exampleService.update(+uuid, updateExampleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exampleService.remove(+id);
  }
}
