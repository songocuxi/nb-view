export interface Task {
  taskId?: string;
  taskName: string | null;
  taskDescription: string | null;
  taskStartAt: Date | undefined | null;
  taskEndAt: Date | undefined | null;
  taskStatus: string;
  taskDuration: number | undefined;
  projectId: string | undefined;
}
