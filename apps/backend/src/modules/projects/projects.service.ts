import { Injectable } from '@nestjs/common';
import _getProjectTreeById from './methods/get-project-tree-by-id';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class ProjectsService {
  constructor(private readonly neo4jService: Neo4jService) {}
  public async getProjectTreeById(
    input: Omit<Parameters<typeof _getProjectTreeById>[0], 'neo4jService'>,
  ) {
    return await _getProjectTreeById({
      id: input.id,
      neo4jService: this.neo4jService,
    });
  }
}
