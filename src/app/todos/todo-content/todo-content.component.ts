import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ToDoItems } from '../../app.component';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-content.component.html',
})
export class TodoContentComponent {
  listTodo: ToDoItems[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.filteredTodos$.subscribe((todo) => {
      this.listTodo = todo;
    });
  }
  handleChangeStatus(event: any, id: number) {
    const newTodo = [...this.todoService.listTodoSubject.value];
    const todoChangeIdx: number = newTodo.findIndex(
      (td: ToDoItems) => td.id === id
    );

    if (todoChangeIdx === -1) return;
    if (event?.target?.checked === true)
      newTodo[todoChangeIdx].status = 'completed';
    else newTodo[todoChangeIdx].status = 'active';
    this.todoService.updateListTodo(newTodo);
  }
  handleRemoveTodo(id: number) {
    const newTodo = this.listTodo.filter((todo: ToDoItems) => todo.id !== id);
    this.todoService.updateListTodo(newTodo);
  }
}
