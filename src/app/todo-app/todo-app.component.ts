import { Component } from '@angular/core';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-todo-app',
  imports: [SearchFilterComponent, TodoListComponent],
  templateUrl: './todo-app.component.html',
  styleUrl: './todo-app.component.scss'
})
export class TodoAppComponent {

}
