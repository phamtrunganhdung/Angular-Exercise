import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ToDoItems } from '../../interface';
import { TodoService } from '../../service/todo.service';

interface TodoFilter {
  key: 'all' | 'active' | 'completed';
  title: string;
}

@Component({
  selector: 'app-todo-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-footer.component.html',
})
export class TodoFooterComponent {
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
  filter: 'all' | 'active' | 'completed' = 'all';

  lengthActive: number = 0;
  lengthAll: number = 0;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.listTodo$.subscribe((todo) => {
      this.lengthActive = todo.filter(
        (td: ToDoItems) => td.status === 'active'
      ).length;
      this.lengthAll = todo.length;
    });
  }

  handleFilterStatus(fil: 'all' | 'active' | 'completed') {
    this.filter = fil;
    this.todoService.updateFilterStatus(this.filter);
  }

  handleClearCompleted() {
    this.todoService.clearCompleted();
  }
}
