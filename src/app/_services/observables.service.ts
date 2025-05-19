import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { chores } from './chores.const';

@Injectable({
  providedIn: 'root'
})
export class ObservablesService {
  _search = '';
  search$ = new BehaviorSubject<string>('');
  debounce = ''
  suggestionList = [''];

  constructor() {
    this.search$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(e=>e.toLowerCase())).subscribe(e => {
        this.suggestionList = chores.filter(x => x.toLowerCase().includes(e)).slice(0,5)
      });
  }

  get search() {
    return this._search;
  }

  set search(value: string) {
    this._search = value;
    this.search$.next(value);
  }

  selectSuggestion = (value: string) => {
    this.search = value;
  }
}
