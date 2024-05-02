import { Neo4jService } from 'nest-neo4j/dist';
import { Document } from '@docs-hub/shared-types';
import { Labels } from '../../../constants/neo4j';
import { NotFoundException } from '@nestjs/common';

type Input = {
  id: string;
  neo4jService: Neo4jService;
};

type Output = Document;

const getDocumentById = async ({
  id,
  neo4jService,
}: Input): Promise<Output> => {
  const cypher = `
  MATCH (d:${Labels.DOCUMENT}) WHERE elementid(d) = $id
  RETURN d
  `;
  const params = {
    id,
  };
  const res = await neo4jService.read(cypher, params);
  if (!res.records[0]) {
    throw new NotFoundException('Document not found');
  }
  const val = res.records[0].get('d');
  const {
    elementId,
    properties: { name, content },
  } = val;
  return {
    name,
    content,
    id: elementId,
  };
};

export default getDocumentById;
