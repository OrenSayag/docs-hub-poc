import { Neo4jService } from 'nest-neo4j/dist';
import { Labels } from '../../../constants/neo4j';

type Input = {
  id: string;
  name: string;
  neo4jService: Neo4jService;
};

type Output = Promise<void>;

const updateDirectory = async ({ name, neo4jService, id }: Input): Output => {
  const cypher = `
  MATCH (dir:${Labels.DIRECTORY}) WHERE elementid(dir)=$id
  SET dir.name=$name
  RETURN dir
  `;
  const params = {
    name,
    id,
  };
  await neo4jService.write(cypher, params);
};

export default updateDirectory;
