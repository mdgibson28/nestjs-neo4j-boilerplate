import { Global, Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j';
import { DatabaseService } from './database.service';

@Module({
  imports: [Neo4jModule.fromEnv()],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
