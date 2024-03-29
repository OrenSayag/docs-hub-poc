import { Controller, Get } from '@nestjs/common';

@Controller('neo4j')
export class Neo4jController {
  @Get()
  hello() {
    return 'Hello, Neo4j!';
  }
}
