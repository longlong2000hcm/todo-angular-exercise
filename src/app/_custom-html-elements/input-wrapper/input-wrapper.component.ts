import { Component, computed, contentChild, input } from '@angular/core';
import { InputRefDirective } from './input-ref.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'input-wrapper',
  imports: [CommonModule],
  templateUrl: './input-wrapper.component.html',
  styleUrl: './input-wrapper.component.scss'
})
export class InputWrapperComponent {
  label = input.required();
  inputContent = contentChild(InputRefDirective);
  showClearBtn = computed(()=>this.inputContent()?.ngModel())

  clear() {
    this.inputContent()?.deleteAll()
  }
}