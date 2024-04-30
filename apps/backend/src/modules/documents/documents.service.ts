import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import _getDocumentById from './methods/get-document-by-id';
import _updateDocument from './methods/update-document';

@Injectable()
export class DocumentsService {
  constructor(private readonly neo4jService: Neo4jService) {}

  public async getDocumentById(
    input: Omit<Parameters<typeof _getDocumentById>[0], 'neo4jService'>,
  ) {
    return await _getDocumentById({
      neo4jService: this.neo4jService,
      ...input,
    });
  }
  public async updateDocument(
    input: Omit<Parameters<typeof _updateDocument>[0], 'neo4jService'>,
  ) {
    return await _updateDocument({
      neo4jService: this.neo4jService,
      ...input,
    });
  }
}
