import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { TodoContentComponent } from './todos/todo-content/todo-content.component';
import { TodoFooterComponent } from './todos/todo-footer/todo-footer.component';
import { TodoHeaderComponent } from './todos/todo-header/todo-header.component';

export interface ToDoItems {
  id: number;
  name: string;
  status: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    TodoHeaderComponent,
    TodoContentComponent,
    TodoFooterComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {}
