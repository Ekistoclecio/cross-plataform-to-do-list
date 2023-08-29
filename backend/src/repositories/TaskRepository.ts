import { PostgresDataSource } from "../database/app-data-source";
import { Task } from "../database/entities/Task.entity";

export const taskRepository = PostgresDataSource.getRepository(Task);
