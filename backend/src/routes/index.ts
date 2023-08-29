import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { TaskController } from "../controllers/TaskController";

const routes = Router();

routes.post("/user/create", new UserController().create);
routes.post("/user/login", new UserController().login);
routes.get("/:User_id", new UserController().getTasksArrayByUserId);

routes.post("/tasks/create/:User_id/", new TaskController().create);
routes.delete("/tasks/delete/:User_id/:Task_id", new TaskController().delete);
routes.put("/tasks/update/:User_id/:Task_id", new TaskController().update);
routes.patch(
  "/tasks/notification_patch/:User_id/:Task_id",
  new TaskController().notificationStatusPatch
);
routes.patch(
  "/tasks/progress_status_patch/:User_id/:Task_id",
  new TaskController().progressStatusPatch
);

export default routes;
