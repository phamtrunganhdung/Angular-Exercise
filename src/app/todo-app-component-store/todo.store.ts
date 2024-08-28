import { Injectable } from '@angular/core';

import { ComponentStore } from '@ngrx/component-store';

import { ToDoItems, TodoState } from '../interface';

@Injectable()
export class TodoStore extends ComponentStore<TodoState> {
  constructor() {
    super({
      todo: [],
      filterStatus: 'all',
    });
  }

  readonly todos$ = this.select((state) => state.todo);
  readonly filterStatus$ = this.select((state) => state.filterStatus);

  readonly addTodo = this.updater((state, todo: ToDoItems) => {
    return {
      ...state,
      todo: [...state.todo, todo],
    };
  });

  readonly toggleAllStatus = this.updater((state, isCompleted: boolean) => {
    return {
      ...state,
      todo: [
        ...state.todo.map((x) => ({
          ...x,
          status: isCompleted ? 'completed' : 'active',
        })),
      ],
    };
  });

  readonly singleChangeStatus = this.updater(
    (state, changeInfo: { isCompleted: boolean; id: string }) => {
      const newTodo = [...state.todo];
      const todoChangeIdx: number = newTodo.findIndex(
        (td: ToDoItems) => td.id === changeInfo.id
      );
      if (todoChangeIdx === -1) return { ...state };
      newTodo[todoChangeIdx].status = changeInfo.isCompleted
        ? 'completed'
        : 'active';
      return {
        ...state,
        todo: newTodo,
      };
    }
  );

  readonly removeTodo = this.updater((state, id: string) => {
    return {
      ...state,
      todo: [...state.todo.filter((x) => x.id !== id)],
    };
  });

  readonly editTodo = this.updater(
    (state, changeInfo: { value: string; id: string }) => {
      const newTodo = [...state.todo];
      const todoChangeIdx: number = newTodo.findIndex(
        (td: ToDoItems) => td.id === changeInfo.id
      );
      if (todoChangeIdx === -1) return { ...state };
      newTodo[todoChangeIdx].name = changeInfo.value;
      return {
        ...state,
        todo: newTodo,
      };
    }
  );

  readonly filterByStatus = this.updater(
    (state, status: 'all' | 'active' | 'completed') => {
      return {
        ...state,
        filterStatus: status,
      };
    }
  );

  readonly clearCompleted = this.updater((state) => ({
    ...state,
    todo: [...state.todo.filter((x) => x.status !== 'completed')],
  }));

  readonly filterTodo$ = this.select(
    this.todos$,
    this.filterStatus$,
    (todos, status) =>
      status === 'all' ? todos : todos.filter((todo) => todo.status === status)
  );
}
