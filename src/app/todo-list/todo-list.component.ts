import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoService } from '../_services/todo.service';
import { FilterArrayPipe } from '../_pipes/filter-array.pipe';
import { DocumentData } from 'firebase/firestore';
import { GetIncompleteAmountPipe } from '../_pipes/get-incomplete-amount.pipe';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { GetTotalAmountPipe } from '../_pipes/get-total-amount.pipe';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-todo-list',
  imports: [
    CommonModule,
    TodoItemComponent,
    FilterArrayPipe,
    GetIncompleteAmountPipe,
    GetTotalAmountPipe,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  authenticationService = inject(AuthenticationService);
  todoService = inject(TodoService);
  filter = 'all';
  markAll = false;

  constructor() {
    this.todoService.loadTodoList();
  }

  changeFilters = (event: Event) => {
    const selectedFilter = event.target as HTMLButtonElement;
    const filterName = selectedFilter.name;
    this.filter = filterName;
  };

  addItem = (text?: string) => {
    if (!text || text.trim().length == 0) {
      return;
    }
    const newItem = {
      id: Date.now(),
      name: text,
      complete: false,
      userUID: this.authenticationService.auth.currentUser?.uid,
    };
    this.todoService.addTodo(newItem);
  };

  toggleMarkAll = () => {
    this.markAll = !this.markAll;
    this.todoService.markAllDb(this.markAll);
  };

  deleteAllComplete = () => {
    this.todoService.deleteAllComplete();
  };

  trackByItemId(index: number, item: DocumentData) {
    return item ? item['id'] : undefined;
  }
}
