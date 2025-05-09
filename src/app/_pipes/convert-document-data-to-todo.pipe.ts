import { Pipe, PipeTransform } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { Todo } from '../todo.interface';

@Pipe({
  name: 'convertDocumentDataToTodo',
})
export class ConvertDocumentDataToTodoPipe implements PipeTransform {
  transform(data: DocumentData): Todo {
    return { ...data } as Todo;
  }
}
