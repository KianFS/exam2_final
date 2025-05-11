import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, AsyncPipe],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  taskTitle = new FormControl('', { nonNullable: true });
  tasks$!: Observable<Task[]>;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();
  }

  addTask(): void {
    const title = this.taskTitle.value.trim();
    if (!title) return;
    this.taskService.addTask(title).then(() => this.taskTitle.setValue(''));
  }

  toggle(task: Task): void {
    this.taskService.toggleTaskCompletion(task);
  }
}
