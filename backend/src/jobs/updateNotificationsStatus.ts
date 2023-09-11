import cron from "node-cron";
import { taskRepository } from "../repositories/TaskRepository";
import differenceInDaysOfTwoDates from "../utils/differenceInDaysOfTwoDates";
import getCurrentDate from "../utils/getCurrentDate";

export default async function updateNotificationStatus() {
  cron.schedule("0 * * * *", async () => {
    console.log("Atualizando status de notificação das tarefas...");
    const teste = await taskRepository.find();
    teste.map(async (task) => {
      const newStatusNotification = differenceInDaysOfTwoDates(
        task.deadline,
        getCurrentDate()
      );
      if (task.notificationStatus != newStatusNotification) {
        task.notificationStatus = newStatusNotification;
        if (task.finishedDate != null) {
          await taskRepository.update(
            {
              id: task.id,
            },
            {
              notificationStatus: 0,
              notificationVisualization: true,
            }
          );
        } else {
          await taskRepository.update(
            {
              id: task.id,
            },
            {
              notificationStatus: newStatusNotification,
              notificationVisualization:
                newStatusNotification == 0 ? true : false,
            }
          );
        }
      }
    });
  });
}
