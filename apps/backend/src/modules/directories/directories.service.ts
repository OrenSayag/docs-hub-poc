import { Injectable } from '@nestjs/common';

import _createDirectory from './methods/create-directory';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class DirectoriesService {
  constructor(private readonly neo4jService: Neo4jService) {}

  public async createDirectory(
    input: Omit<Parameters<typeof _createDirectory>[0], 'neo4jService'>,
  ) {
    return await _createDirectory({
      neo4jService: this.neo4jService,
      ...input,
    });
  }
}
