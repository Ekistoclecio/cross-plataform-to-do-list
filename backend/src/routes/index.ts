import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { TaskController } from "../controllers/TaskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const routes = Router();

routes.post("/user/create", new UserController().create);
routes.post("/user/login", new UserController().login);

routes.use(authMiddleware);

routes.get("/", new UserController().getActiveTasksByUserId);
routes.get("/archive", new UserController().getArchivedTasksByUserId);

routes.post("/tasks/create", new TaskController().create);
routes.delete("/tasks/delete/:Task_id", new TaskController().delete);
routes.patch("/tasks/archive/:Task_id", new TaskController().archive);
routes.put("/tasks/update/:Task_id", new TaskController().update);
routes.patch(
  "/tasks/notification/:Task_id",
  new TaskController().notificationStatusPatch
);
routes.patch(
  "/tasks/progress_status/:Task_id",
  new TaskController().progressStatusPatch
);

export default routes;
