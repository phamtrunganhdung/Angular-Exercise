import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ToDoItems } from '../../interface';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-todo-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-header.component.html',
})
export class TodoHeaderComponent {
  inputValue: string = '';
  isCplAll: boolean = false;
  lengthAll: number = 0;
  constructor(private todoService: TodoService) {}
  ngOnInit(): void {
    this.todoService.listTodo$.subscribe((todo) => {
      this.lengthAll = todo.length;
      if (todo.filter((td: ToDoItems) => td.status === 'active').length > 0)
        this.isCplAll = false;
    });
  }
  handleTodoOutput() {
    if (this.inputValue.length > 0) {
      this.todoService.addNewTodo(this.inputValue);
      this.inputValue = '';
    }
  }
  handleActiveAll() {
    this.isCplAll = !this.isCplAll;
    this.todoService.changeAllStatus(this.isCplAll);
  }
}
