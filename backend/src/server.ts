import express from "express";
import { PostgresDataSource } from "./database/app-data-source";
import routes from "./routes";
import cors from "cors";
import updateNotificationStatus from "./jobs/updateNotificationsStatus";

PostgresDataSource.initialize().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(routes);

  return app.listen(process.env.SERVER_PORT, () => {
    updateNotificationStatus();
    console.log("Server is running...");
  });
});
