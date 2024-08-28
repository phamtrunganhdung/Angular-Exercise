import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ToDoItems } from '../../../interface';
import { TodoStore } from '../../../todo-app-component-store/todo.store';

interface TodoFilter {
  key: 'all' | 'active' | 'completed';
  title: string;
}

@Component({
  selector: 'app-todo-footer-ng-rx',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './todo-footer.component.html',
})
export class TodoFooterNgRxComponent {
  listFilter: TodoFilter[] = [
    {
      key: 'all',
      title: 'All',
    },
    {
      key: 'active',
      title: 'Active',
    },
    {
      key: 'completed',
      title: 'Completed',
    },
  ];
  todo$!: Observable<ToDoItems[]>;
  filter$: Observable<'all' | 'active' | 'completed'> = of('all');

  lengthActive: number = 0;
  lengthAll: number = 0;

  constructor(private readonly todoStore: TodoStore) {
    this.todo$! = this.todoStore.todos$;
    this.filter$! = this.todoStore.filterStatus$;
  }

  ngOnInit(): void {
    this.todo$.subscribe((td) => {
      this.lengthAll = td.length;
      this.lengthActive = td.filter((x) => x.status === 'active').length;
    });
  }

  handleFilterStatus(fil: 'all' | 'active' | 'completed') {
    this.todoStore.filterByStatus(fil);
  }

  handleClearCompleted() {
    this.todoStore.clearCompleted();
  }
}
