import { Routes } from '@angular/router';

import { ListUserComponent } from './list-user/list-user.component';
import { TodoAppComponent } from './todo-app/todo-app.component';

export const routes: Routes = [
  { path: 'todo-app', component: TodoAppComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: '', redirectTo: '/todo-app', pathMatch: 'full' },
];
