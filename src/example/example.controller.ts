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
  UseGuards,
} from '@nestjs/common';
import { ExampleService } from './example.service';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('example')
@UseGuards(AuthGuard('jwt'))
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
    return this.exampleService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.exampleService.findOne(uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updateExampleDto: UpdateExampleDto,
  ) {
    return this.exampleService.update(uuid, updateExampleDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.exampleService.remove(uuid);
  }
}
