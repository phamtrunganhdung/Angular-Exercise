import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs';

import { ToDoItems } from '../../../interface';
import { CommonService } from '../../../service/common.service';
import { TodoStore } from '../../../todo-app-component-store/todo.store';

@Component({
  selector: 'app-todo-header-ng-rx',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-header.component.html',
})
export class TodoHeaderNgRxComponent {
  inputValue: string = '';
  isCplAll: boolean = false;
  todo$!: Observable<ToDoItems[]>;
  constructor(
    private readonly todoStore: TodoStore,
    private commonService: CommonService
  ) {
    this.todo$! = this.todoStore.todos$;
  }
  ngOnInit(): void {}
  handleTodoOutput() {
    if (this.inputValue.length > 0) {
      const newTodo: ToDoItems = {
        id: this.commonService.generateNewId(),
        name: this.inputValue,
        status: 'active',
      };
      this.todoStore.addTodo(newTodo);
      this.inputValue = '';
    }
  }
  handleActiveAll() {
    this.isCplAll = !this.isCplAll;
    this.todoStore.toggleAllStatus(this.isCplAll);
  }
}
