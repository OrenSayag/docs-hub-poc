import { Neo4jService } from 'nest-neo4j/dist';
import { Labels } from '../../../constants/neo4j';
import { NotFoundException } from '@nestjs/common';

export const buildSetterString = ({
  params,
}: {
  params: Record<string, Record<string, unknown>>;
}) => {
  const setterArr = [];
  for (const key of Object.keys(params)) {
    const record = params[key];
    for (const recordKey of Object.keys(record)) {
      if (record[recordKey] !== undefined) {
        setterArr.push(`${key}.${recordKey}=$${recordKey}`);
      }
    }
  }
  return setterArr.join(', ');
};

export const validateParentExists = async ({
  parentId,
  neo4jService,
}: {
  parentId: string;
  neo4jService: Neo4jService;
}) => {
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
};
