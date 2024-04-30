import { Neo4jService } from 'nest-neo4j/dist';
import { Labels } from '../../../constants/neo4j';
import { NotFoundException } from '@nestjs/common';

type Input = {
  name: string;
  content: string;
  parentId: string;
  neo4jService: Neo4jService;
};

type Output = Promise<void>;

const createDocument = async ({
  content,
  parentId,
  neo4jService,
  name,
}: Input): Output => {
  await validation({
    parentId,
    neo4jService,
  });
  const cypher = `
    MATCH (parent)
    WHERE ((parent:Directory) OR (parent: Project)) AND elementid(parent) = $parentId
    WITH parent
    CREATE (parent)-[:CONTAINS]->(document:Document {name: $name, content: $content})
  `;
  const params = {
    name,
    content,
    parentId,
  };
  await neo4jService.write(cypher, params);
};

export default createDocument;

async function validation({
  parentId,
  neo4jService,
}: {
  parentId: string;
  neo4jService: Neo4jService;
}) {
  const cypher = `
  MATCH (parent)
  WHERE elementid(parent)=$parentId
  AND ((parent:${Labels.DIRECTORY}) OR (parent:${Labels.PROJECT}))
  RETURN parent;
  `;
  const params = {
    parentId,
  };
  const queryRes = await neo4jService.read(cypher, params);
  if (!queryRes.records[0]) {
    throw new NotFoundException('Parent not found');
  }
}
