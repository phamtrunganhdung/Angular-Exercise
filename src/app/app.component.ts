import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { Tabs } from './interface';
import { TodoAppNgRxComponent } from './todo-app-component-store/todo-app.component';
import { TodoAppComponent } from './todo-app/todo-app.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    TodoAppComponent,
    RouterModule,
    TodoAppNgRxComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private router: Router) {}
  tabs: Tabs[] = [
    {
      id: 'todo-app-ng-rx',
      path: '/todo-app-ng-rx',
      name: 'Todo App NgRx',
    },
    {
      id: 'todo',
      path: '/todo-app',
      name: 'Todo App',
    },
    {
      id: 'listUser',
      path: '/list-user',
      name: 'List User',
    },
    {
      id: 'movies',
      path: '/movies',
      name: 'Movies',
    },
  ];

  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }
}
