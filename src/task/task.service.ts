import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskStatusEnum } from './task.dto';
import { v4 as uuid } from 'uuid'

@Injectable()
export class TaskService {

  private tasks: TaskDto[] = []


  create(task: TaskDto) {
    task.id = uuid()
    task.status = TaskStatusEnum.TO_DO
    this.tasks.push(task)
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.find(task => task.id == id) ?? null
    //if(!foundTask) throw new NotFoundException(`not found task by id ${id}`)
    if(!foundTask) throw new HttpException(`not found task by id ${id}`, HttpStatus.NOT_FOUND)
    return foundTask
  }

  findAll(params: FindAllParameters): TaskDto[] {
    return this.tasks.filter(task => {
      let match = true
      if(!!params.title && !task.title.includes(params.title)) {
        match = false
      }

      if(!!params.status && !task.status.includes(params.status)) {
        match = false
      }

      return match
      
    })    
  }

  update(task: TaskDto) {
    const taskIndex = this.tasks.findIndex(tasked => tasked.id == task.id)
     if(taskIndex >= 0) {
      this.tasks[taskIndex] = task
      return
     }
     throw new HttpException(`Task  with id ${task.id} not found`, HttpStatus.BAD_REQUEST)
  }

  remove(id: string) {
    let taskIndex = this.tasks.findIndex(t => t.id == id) ?? null
    if(taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1)
      return
    }
    throw new HttpException(`not found task by id ${id}`, HttpStatus.BAD_REQUEST)
  
  }

}
