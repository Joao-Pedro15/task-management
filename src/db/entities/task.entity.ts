import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'task' })
export class TaskEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: "varchar" })
  username: string

  @Column({ type: "varchar", name: "password_hash" })
  passwordHash: string
}