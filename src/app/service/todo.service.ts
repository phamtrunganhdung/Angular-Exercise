import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, map } from 'rxjs';

import { ToDoItems } from '../interface';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private listTodoSubject = new BehaviorSubject<ToDoItems[]>([]);
  listTodo$ = this.listTodoSubject.asObservable();

  private filterStatusSubject = new BehaviorSubject<
    'all' | 'active' | 'completed'
  >('all');
  filterStatus$ = this.filterStatusSubject.asObservable();

  constructor(private readonly commonService: CommonService) {}

  updateListTodo(newList: ToDoItems[]) {
    this.listTodoSubject.next([...newList]);
  }
  addNewTodo(newTodoName: string) {
    const newLst = this.listTodoSubject.value;
    const newId = this.commonService.generateNewId();
    newLst.push({
      id: newId,
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
