import { Neo4jService } from 'nest-neo4j/dist';
import { validateParentExists } from '../../utilities/methods/neo4j';
import { Labels, Relationships } from '../../../constants/neo4j';

type Input = {
  neo4jService: Neo4jService;
  name: string;
  parentId: string;
};

type Output = Promise<void>;

const createDirectory = async ({
  name,
  neo4jService,
  parentId,
}: Input): Output => {
  await validateParentExists({
    parentId,
    neo4jService,
  });
  const cypher = `
    MATCH (parent)
    WHERE ((parent:${Labels.DIRECTORY}) OR (parent: ${Labels.PROJECT})) AND elementid(parent) = $parentId
    WITH parent
    CREATE (parent)-[:${Relationships.CONTAINS}]->(directory:${Labels.DIRECTORY} {name: $name})
  `;
  const params = {
    name,
    parentId,
  };
  await neo4jService.write(cypher, params);
};

export default createDirectory;
