import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {

  private tasks: TaskDto[] = []

  create(task: TaskDto) {
    this.tasks.push(task)
    console.log(this.tasks)
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.find(task => task.id == id) ?? null
    //if(!foundTask) throw new NotFoundException(`not found task by id ${id}`)
    if(!foundTask) throw new HttpException(`not found task by id ${id}`, HttpStatus.NOT_FOUND)
    return foundTask
  }

  update(task: TaskDto) {
    const taskIndex = this.tasks.findIndex(tasked => tasked.id == task.id)
     if(taskIndex >= 0) {
      this.tasks[taskIndex] = task
      return
     }
     throw new HttpException(`Task  with id ${task.id} not found`, HttpStatus.BAD_REQUEST)
  }

}
