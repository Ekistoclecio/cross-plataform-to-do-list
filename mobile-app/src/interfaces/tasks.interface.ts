interface TaskDataInterface {
  id: string;
  progressStatus: 0 | 1 | 2;
  title: string;
  description: string | null;
  priority: boolean;
  deadline: string;
  notificationStatus: 0 | 1 | 2;
  notificationVisualization: boolean;
  finishedDate: string | null;
  isArchived: boolean;
}
