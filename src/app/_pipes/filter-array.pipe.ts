import { inject, Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../todo.interface';
import { ObservablesService } from '../_services/observables.service';
// var trigger = 0;

@Pipe({
  name: 'filterArray',
})
export class FilterArrayPipe implements PipeTransform {
  observablesService = inject(ObservablesService);
  transform(todoList: Todo[] | null, {filter, search}:{filter: string, search: string}): Todo[] {
    // LOGGER
    // trigger++;
    // console.log('filter pipe trigger', trigger)
    
    if (!todoList) {
      return [];
    }

    // Sort by time created
    todoList.sort((a, b) => {
      return a['id'] - b['id'];
    });

    // Filter by search term
    todoList = todoList.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))

    if (filter == 'all') {
      return todoList
    }

    // Filtering todoList by complete status
    let filteredList: Todo[] = [];
    if (filter == 'complete') {
      filteredList = todoList.filter(e => e.complete==true)
    }
    if (filter == 'active') {
      filteredList = todoList.filter(e => e.complete==false)
    }

    return filteredList;
  }
}
