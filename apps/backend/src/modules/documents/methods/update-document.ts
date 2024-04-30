import { Neo4jService } from 'nest-neo4j/dist';
import { buildSetterString } from '../../utilities/methods/neo4j';

type Input = {
  id: string;
  content?: string;
  name?: string;
  neo4jService: Neo4jService;
};

type Output = Promise<void>;

const updateDocument = async ({
  content,
  name,
  id,
  neo4jService,
}: Input): Output => {
  if (content === undefined && name === undefined) {
    return;
  }
  const setterString = buildSetterString({
    params: {
      d: {
        content,
        name,
      },
    },
  });
  const cypher = `
  MATCH (d:Document) WHERE elementid(d) = $id
  SET
  ${setterString}
  RETURN d
  `;
  const params = {
    content,
    name,
    id,
  };
  await neo4jService.write(cypher, params);
};

export default updateDocument;
