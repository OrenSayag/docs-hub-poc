import { ProjectTree, ProjectTreeLevelType } from '@./shared-types';
import { Neo4jService } from 'nest-neo4j/dist';
import { Labels, PropNames, Relationships } from '../../../constants/neo4j';
import { NotFoundException } from '@nestjs/common';
import { BaseCypherQueryResItem } from '../../../types/neo4j.types';

type Input = {
  id: string;
  neo4jService: Neo4jService;
};

const getProjectTreeById = async ({
  id,
  neo4jService,
}: Input): Promise<ProjectTree> => {
  const cypher = `
  MATCH path = (p:${Labels.PROJECT})-[:${Relationships.CONTAINS}*]->(docOrDir)
  WHERE elementid(p) = $id
  WITH collect(path) AS paths, count(p) AS projectsCount
  CALL apoc.convert.toTree(paths, false, {
    nodes: {
        ${Labels.DIRECTORY}: ['${PropNames.NAME}'],
        ${Labels.DOCUMENT}: ['${PropNames.NAME}']
      }
    })
  YIELD value
  RETURN value;
  `;
  const tree = await neo4jService.read(cypher, {
    id,
  });
  const { records } = tree;
  if (isEmptyResult(records)) {
    throw new NotFoundException('Project not found');
  }
  const res = normalizeNodes(records[0].get('value'));
  return res;
};

export default getProjectTreeById;

type QueryResItem = BaseCypherQueryResItem & {
  name: string;
  [Relationships.CONTAINS]: QueryResItem[];
};

function normalizeNodes(root: QueryResItem): ProjectTree {
  const { name, CONTAINS, _type, _elementId } = root;
  return {
    name,
    id: _elementId,
    levelType: _type as ProjectTreeLevelType,
    children: CONTAINS?.map((item) => normalizeNodes(item)) ?? [],
  };
}

function isEmptyResult(input: unknown) {
  return (Object.keys(input[0].get('value')).length ?? 0) < 1;
}
