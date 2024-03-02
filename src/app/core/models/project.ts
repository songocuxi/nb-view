export interface Project {
  projectId?: string;
  projectName: string | undefined;
  projectStartAt: any;
  projectEndAt: any;
  projectDuration: number | undefined | null;
  projectStatus: string | undefined;
  projectCreatorId: string | undefined;
}
