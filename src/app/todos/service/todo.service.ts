import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, map } from 'rxjs';

import { ToDoItems } from '../../app.component';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  listTodoSubject = new BehaviorSubject<ToDoItems[]>([
    {
      id: 1,
      name: 'di da banh',
      status: 'active',
    },
    {
      id: 2,
      name: 'di hoc',
      status: 'active',
    },
    {
      id: 3,
      name: 'di ngu',
      status: 'active',
    },
    {
      id: 4,
      name: 'di boi',
      status: 'active',
    },
    {
      id: 5,
      name: 'di danh bi-a',
      status: 'active',
    },
    {
      id: 6,
      name: 'di cho',
      status: 'active',
    },
  ]);
  listTodo$ = this.listTodoSubject.asObservable();

  private filterStatusSubject = new BehaviorSubject<
    'all' | 'active' | 'completed'
  >('all');
  filterStatus$ = this.filterStatusSubject.asObservable();

  updateListTodo(newList: ToDoItems[]) {
    this.listTodoSubject.next([...newList]);
  }
  addNewTodo(newTodoName: string) {
    const newLst = this.listTodoSubject.value;
    newLst.push({
      id: newLst.length + 1,
      name: newTodoName,
      status: 'active',
    });
    this.listTodoSubject.next(newLst);
  }
  changeAllStatus(status: boolean) {
    const newLst = this.listTodoSubject.value.map((td: ToDoItems) => ({
      ...td,
      status: status ? 'completed' : 'active',
    }));
    this.listTodoSubject.next(newLst);
  }
  clearCompleted() {
    this.listTodoSubject.next(
      this.listTodoSubject.value.filter(
        (td: ToDoItems) => td.status !== 'completed'
      )
    );
  }
  updateFilterStatus(status: 'all' | 'active' | 'completed') {
    this.filterStatusSubject.next(status);
  }

  filteredTodos$ = combineLatest([this.listTodo$, this.filterStatus$]).pipe(
    map(([todos, filterStatus]) => {
      if (filterStatus === 'all') {
        return todos;
      } else {
        return todos.filter((todo) => todo.status === filterStatus);
      }
    })
  );
}
