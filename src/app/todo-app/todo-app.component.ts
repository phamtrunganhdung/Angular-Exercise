import { Component } from '@angular/core';

import { TodoContentComponent } from './todos/todo-content/todo-content.component';
import { TodoFooterComponent } from './todos/todo-footer/todo-footer.component';
import { TodoHeaderComponent } from './todos/todo-header/todo-header.component';

@Component({
  selector: 'app-todo-app',
  standalone: true,
  imports: [TodoContentComponent, TodoFooterComponent, TodoHeaderComponent],
  templateUrl: './todo-app.component.html',
})
export class TodoAppComponent {}
