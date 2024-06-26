import { Neo4jService } from 'nest-neo4j/dist';
import { validateParentExists } from '../../utilities/methods/neo4j';
import { Labels, Relationships } from '../../../constants/neo4j';

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
  await validateParentExists({
    parentId,
    neo4jService,
  });
  const cypher = `
    MATCH (parent)
    WHERE ((parent:${Labels.DIRECTORY}) OR (parent: ${Labels.PROJECT})) AND elementid(parent) = $parentId
    WITH parent
    CREATE (parent)-[:${Relationships.CONTAINS}]->(document:${Labels.DOCUMENT} {name: $name, content: $content})
  `;
  const params = {
    name,
    content,
    parentId,
  };
  await neo4jService.write(cypher, params);
};

export default createDocument;
