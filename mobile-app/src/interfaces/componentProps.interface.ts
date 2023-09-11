interface PropsTaskCardInterface {
  archivable: boolean;
  taskId: string;
}

interface PropsTaskBoardInterface {
  title: string;
  progressStatus: 0 | 1 | 2;
}

interface PropsTaskCardFileInterface {
  taskId: string;
}

interface PropsTaskCardFileInterface {
  taskId: string;
}

interface PropsDatePickerInterface {
  isReadOnly: boolean;
  setFormData: (val: any) => void;
  formData: PropsFormDataDatePickerInterface;
}

interface PropsFormDataDatePickerInterface {
  title: string;
  description: string;
  deadline: string;
  priority: boolean;
}

interface PropsChartPieInterface {
  title: string;
  priority: boolean;
}

interface PropsChartLineInterface {
  title: string;
  priority: boolean;
  filterChart: 0 | 1 | 2;
}
