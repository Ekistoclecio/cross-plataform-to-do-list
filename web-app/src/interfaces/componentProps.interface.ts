interface PropsAuthFormInterface {
  newUser: boolean;
  setNewUser: (e: boolean) => void;
}

interface PropsCreateTaskModalInterface {
  isOpen: boolean;
  onClose: () => void;
}

interface PropsEditTaskModalInterface {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  file?: boolean;
}

interface PropsTaskCardInterface {
  archivable: boolean;
  taskId: string;
}

interface PropsNotificationTaskCardInterface {
  taskId: string;
  newNotification: boolean;
}

interface PropsArchiveModalInterface {
  isOpen: boolean;
  onClose: () => void;
}

interface PropsArchiveTaskCardInterface {
  taskId: string;
}

interface PropsConfirmDeleteTaskAlertInterface {
  isOpen: boolean;
  cancelRef: any;
  onClose: () => void;
  taskTitle: string;
  sendDeleteTask: () => void;
}

interface PropsApexLineGraphicInterface {
  graphicTitle: string;
  filterType: 0 | 1 | 2;
  priority: boolean;
}

interface PropsFilterDateModalInterface {
  isOpen: boolean;
  onClose: () => void;
  setInitialDate: (val: any) => void;
  setFinishDate: (val: any) => void;
  setDateFilter: (val: any) => void;
  setIntervalFilter: (val: any) => void;
}

interface PropsTaskBoardInterface {
  title: string;
  progressStatus: 0 | 1 | 2;
}

interface PropsApexPieGraphicInterface {
  graphicTitle: string;
  priority: boolean;
}
