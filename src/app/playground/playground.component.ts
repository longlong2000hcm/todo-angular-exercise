import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { isEqual } from 'lodash';
import { HighlightDirective } from '../_directives/highlight.directive';
import { MyTrComponent } from '../_custom-html-elements/my-tr/my-tr.component';
import { FormsModule } from '@angular/forms';
import { InputRefDirective } from '../_custom-html-elements/input-wrapper/input-ref.directive';
import { InputWrapperComponent } from '../_custom-html-elements/input-wrapper/input-wrapper.component';

@Component({
  selector: 'playground',
  imports: [FormsModule, MyTrComponent, InputRefDirective, HighlightDirective, InputWrapperComponent],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent {
  a = signal<number>(1, {equal: isEqual})
  b = computed(()=> this.a() * 2)
  injector = inject(Injector);
  state = signal(0);
  color = '';
  inputProject=''

  constructor() {
    // outputToObservable()
  }

  startLogging = () => { 
    effect(() => {
      console.log('log a:', this.a)
    }, {injector: this.injector})
  }

  plus = () => {
    this.a.update(x=>x+1)
  }

  childEmit = ($event: any) => {
    alert($event);
  }
}
