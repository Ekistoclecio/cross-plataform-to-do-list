import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.entity";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ enum: [0, 1, 2] })
  progressStatus: number;

  @Column({ length: 128 })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: "boolean" })
  priority: boolean;

  @Column({ type: "date" })
  deadline: string;

  @Column({ enum: [0, 1, 2] })
  notificationStatus: number;

  @Column({ type: "boolean" })
  notificationVisualization: boolean;

  @Column({ type: "date", nullable: true })
  finishedDate: string;

  @Column({ type: "boolean" })
  isArchived: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: "User_id" })
  user: User;
}
