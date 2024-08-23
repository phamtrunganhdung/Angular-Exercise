import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';

import { ToDoItems } from '../../app.component';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-content.component.html',
})
export class TodoContentComponent {
  listTodo: ToDoItems[] = [];
  idEditTodo!: number;
  @ViewChildren('editTodo') editInput!: QueryList<
    ElementRef<HTMLButtonElement>
  >;
  constructor(private todoService: TodoService, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const inputFocus = this.editInput.find(
        (x) => x.nativeElement.id === this.idEditTodo.toString()
      );
      if (inputFocus && e.target !== inputFocus.nativeElement) {
        this.idEditTodo = 0;
        inputFocus.nativeElement.value = '';
      }
    });
  }

  ngOnInit(): void {
    this.todoService.filteredTodos$.subscribe((todo) => {
      this.listTodo = todo;
    });
  }
  handleChangeStatus(event: any, id: number) {
    const newTodo = [...this.todoService.listTodoSubject.value];
    const todoChangeIdx: number = newTodo.findIndex(
      (td: ToDoItems) => td.id === id
    );

    if (todoChangeIdx === -1) return;
    if (event?.target?.checked === true)
      newTodo[todoChangeIdx].status = 'completed';
    else newTodo[todoChangeIdx].status = 'active';
    this.todoService.updateListTodo(newTodo);
  }
  handleRemoveTodo(id: number) {
    const newTodo = [...this.todoService.listTodoSubject.value].filter(
      (todo: ToDoItems) => todo.id !== id
    );
    this.todoService.updateListTodo(newTodo);
  }
  handleEditTodo(id: number) {
    const newTodo = [...this.todoService.listTodoSubject.value];
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
  handleEditStatus(event: any, id: number) {
    const newTodo = [...this.todoService.listTodoSubject.value];
    const todoChangeIdx: number = newTodo.findIndex(
      (td: ToDoItems) => td.id === id
    );
    if (todoChangeIdx === -1) return;
    newTodo[todoChangeIdx].name = event.target?.value;
    this.todoService.updateListTodo(newTodo);
    this.idEditTodo = 0;
  }
}
