import { Directive, ElementRef, model } from '@angular/core';

@Directive({
  selector: 'input[inputRef]'
})
export class InputRefDirective {
  ngModel = model(); 

  constructor(private el: ElementRef) {
    (el.nativeElement as HTMLInputElement).setAttribute('placeholder','')
  }

  deleteAll() {
    this.ngModel.set('');
  }
}
