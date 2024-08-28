import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';

import { Observable } from 'rxjs';

import { ToDoItems } from '../../../interface';
import { TodoStore } from '../../../todo-app-component-store/todo.store';

@Component({
  selector: 'app-todo-content-ng-rx',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-content.component.html',
})
export class TodoContentNgRxComponent {
  todo$!: Observable<ToDoItems[]>;
  todoFilter$!: Observable<ToDoItems[]>;
  listTodoHaveNotFilter: ToDoItems[] = [];
  idEditTodo!: string;
  @ViewChildren('editTodo') editInput!: QueryList<
    ElementRef<HTMLButtonElement>
  >;
  constructor(
    private readonly todoStore: TodoStore,
    private renderer: Renderer2
  ) {
    this.todo$! = this.todoStore.todos$;
    this.todoFilter$! = this.todoStore.filterTodo$;

    this.renderer.listen('window', 'click', (e: Event) => {
      const inputFocus = this.editInput.find(
        (x) => x.nativeElement.id === this.idEditTodo.toString()
      );
      if (inputFocus && e.target !== inputFocus.nativeElement) {
        this.idEditTodo = '';
        inputFocus.nativeElement.value = '';
      }
    });
  }

  handleChangeStatus(event: any, id: string) {
    this.todoStore.singleChangeStatus({
      isCompleted: event?.target?.checked,
      id,
    });
  }
  handleRemoveTodo(id: string) {
    this.todoStore.removeTodo(id);
  }
  handleEditTodo(id: string) {
    let newTodo: ToDoItems[] = [];
    this.todo$.subscribe((td) => (newTodo = [...td]));
    const todoFind: ToDoItems | undefined = newTodo.find(
      (td: ToDoItems) => td.id === id
    );
    this.idEditTodo = id;
    const inputFocus = this.editInput.find(
      (x) => x.nativeElement.id === id.toString()
    );
    if (inputFocus)
      setTimeout(() => {
        inputFocus.nativeElement.focus();
        inputFocus.nativeElement.value = todoFind?.name || '';
      }, 50);
  }
  handleEditStatus(event: any, id: string) {
    this.todoStore.editTodo({ value: event.target?.value, id });
    this.idEditTodo = '';
  }
}
