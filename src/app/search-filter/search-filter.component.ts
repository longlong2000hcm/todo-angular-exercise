import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { chores } from '../_services/chores.const';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { TodoService } from '../_services/todo.service';
import { CustomInputComponent } from '../_custom-html-elements/custom-input/custom-input.component';

@Component({
  selector: 'search-filter',
  imports: [FormsModule, CustomInputComponent],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent implements OnDestroy {
  search='';
  search$ = new BehaviorSubject<string>('');
  suggestionList = [''];

  constructor(
    private todoService: TodoService
  ) {
    this.search$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(e=>e.toLowerCase())
    )
    .subscribe(e => {
      this.suggestionList = chores.filter(x => x.toLowerCase().includes(e)).slice(0,5);
    });
  }

  ngOnDestroy(): void {
      this.todoService.search = ''
  }

  selectSuggestion(value:string) {
    this.search=value;
  }

  searchModelChange = (value: string) => {
    this.search=value;
    this.search$.next(value);
    this.todoService.search = value;
  }
}
