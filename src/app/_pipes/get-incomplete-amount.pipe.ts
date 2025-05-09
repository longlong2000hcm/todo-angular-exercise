import { Pipe, PipeTransform } from '@angular/core';
import { DocumentData } from 'firebase/firestore';

@Pipe({
  name: 'getIncompleteAmount',
})
export class GetIncompleteAmountPipe implements PipeTransform {
  transform(listSnapshot: DocumentData[] | null): number {
    if (listSnapshot === null) {
      return 0;
    }
    let incompleteAmount = 0;
    for (const item of listSnapshot) {
      if (item['complete'] == false) {
        incompleteAmount++;
      }
    }
    return incompleteAmount;
  }
}
