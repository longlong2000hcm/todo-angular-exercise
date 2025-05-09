import { Pipe, PipeTransform } from '@angular/core';
import { DocumentData } from 'firebase/firestore';

@Pipe({
  name: 'getTotalAmount',
})
export class GetTotalAmountPipe implements PipeTransform {
  transform(listSnapshot: DocumentData[] | null): number {
    if (listSnapshot === null) {
      return 0;
    }
    return listSnapshot.length;
  }
}
