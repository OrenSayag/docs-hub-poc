import { ProjectTreeLevelType } from '@docs-hub/shared-types';

export enum Relationships {
  CONTAINS = 'CONTAINS',
}

export enum Labels {
  PROJECT = ProjectTreeLevelType.PROJECT,
  DOCUMENT = ProjectTreeLevelType.DOCUMENT,
  DIRECTORY = ProjectTreeLevelType.DIRECTORY,
}

export enum PropNames {
  NAME = 'name',
}
