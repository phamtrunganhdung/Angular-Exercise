import { Routes } from '@angular/router';

import { ListUserComponent } from './list-user/list-user.component';
import { MoviesComponent } from './movies/movies.component';
import { TodoAppNgRxComponent } from './todo-app-component-store/todo-app.component';
import { TodoAppComponent } from './todo-app/todo-app.component';

export const routes: Routes = [
  { path: 'todo-app-ng-rx', component: TodoAppNgRxComponent },
  { path: 'todo-app', component: TodoAppComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'movies', component: MoviesComponent },
  { path: '', redirectTo: '/todo-app-ng-rx', pathMatch: 'full' },
];
