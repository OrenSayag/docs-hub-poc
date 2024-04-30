export enum ProjectTreeLevelType {
  PROJECT = 'Project',
  DIRECTORY = 'Directory',
  DOCUMENT = 'Document',
}

export type ProjectTree = {
  name: string;
  id: string;
  children: ProjectTree[];
  levelType: ProjectTreeLevelType;
};
