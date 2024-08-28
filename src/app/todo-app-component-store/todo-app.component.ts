import { Component } from '@angular/core';

import { TodoStore } from './todo.store';
import { TodoContentNgRxComponent } from './todos-component-store/todo-content/todo-content.component';
import { TodoFooterNgRxComponent } from './todos-component-store/todo-footer/todo-footer.component';
import { TodoHeaderNgRxComponent } from './todos-component-store/todo-header/todo-header.component';

@Component({
  selector: 'app-todo-app-ng-rx',
  standalone: true,
  imports: [
    TodoContentNgRxComponent,
    TodoFooterNgRxComponent,
    TodoHeaderNgRxComponent,
  ],
  templateUrl: './todo-app.component.html',
  providers: [TodoStore],
})
export class TodoAppNgRxComponent {}
