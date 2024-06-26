import { Neo4jService } from 'nest-neo4j/dist';
import { Labels } from '../../../constants/neo4j';

type Input = {
  id: string;
  neo4jService: Neo4jService;
};

type Output = Promise<void>;

const deleteDocument = async ({ id, neo4jService }: Input): Output => {
  const cypher = `
  MATCH (doc:${Labels.DOCUMENT}) WHERE elementid(doc) = $id
  WITH doc
  DETACH DELETE doc
  `;
  const params = {
    id,
  };
  await neo4jService.write(cypher, params);
};

export default deleteDocument;
