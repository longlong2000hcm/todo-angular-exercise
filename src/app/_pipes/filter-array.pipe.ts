import { Pipe, PipeTransform } from '@angular/core';
// import { DocumentData } from 'firebase/firestore';
import { Todo } from '../todo.interface';
let i = 0;

@Pipe({
  name: 'filterArray',
})
export class FilterArrayPipe implements PipeTransform {
  transform(todoList: Todo[] | null, filter: string): Todo[] {
    //LOGGER------
    i += 1;
    console.log('pipe called (', i, ')');
    //------------

    if (!todoList) {
      return [];
    }

    if (filter == 'all') {
      // Sort by time created
      return todoList.sort((a, b) => {
        return a['id'] - b['id'];
      });
    }

    const filteredList: Todo[] = [];

    // Filtering todoList
    for (const i of todoList) {
      if (filter == 'complete' && i['complete']) {
        filteredList.push(i);
      }
      if (filter == 'active' && !i['complete']) {
        filteredList.push(i);
      }
    }

    // Sort by time created
    filteredList.sort((a, b) => {
      return a['id'] - b['id'];
    });

    return filteredList;
  }
}
