import { Neo4jService } from 'nest-neo4j/dist';
import { Labels } from '../../../constants/neo4j';

type Input = {
  id: string;
  neo4jService: Neo4jService;
};

type Output = Promise<void>;

const deleteDirectory = async ({ id, neo4jService }: Input): Output => {
  const cypher = `
  MATCH (dir:${Labels.DIRECTORY}) WHERE elementid(dir) = $id
  WITH dir
  DETACH DELETE dir
  `;
  const params = {
    id,
  };
  await neo4jService.write(cypher, params);
};

export default deleteDirectory;
