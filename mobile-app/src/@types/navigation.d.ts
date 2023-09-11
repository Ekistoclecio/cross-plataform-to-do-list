export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      auth: undefined;
      kanbanList: undefined;
      dashboard: undefined;
      file: undefined;
      notification: undefined;
      createTask: undefined;
      editTask: {
        taskId: string;
        prevScreen: "kanbanList" | "notification" | "file";
      };
    }
  }
}
