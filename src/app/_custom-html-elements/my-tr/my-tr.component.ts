import { AfterViewInit, Component, computed, contentChild, ElementRef, input, model, output } from '@angular/core';

@Component({
  selector: 'tr[my-tr]',
  imports: [],
  templateUrl: './my-tr.component.html',
  styleUrl: './my-tr.component.scss',
})
export class MyTrComponent implements AfterViewInit{
  prop1 = input('default prop 1')
  inputModel = model(999);
  output1 = output<string>();
  output2 = output<string>();
  divContentRef = contentChild<ElementRef<HTMLDivElement>>('input1');
  divText = computed(()=>this.divContentRef()?.nativeElement.textContent)

  ngAfterViewInit(): void {
      console.log(this.divText())
  }

  updateModel = () => {
    this.inputModel.update(currentValue=>currentValue+1)
  }

  emit1 = () => {
    this.output1.emit('emit 1');
  }

  emit2 = () => {
    this.output2.emit('emit 2')
  }

  alertEmit = () => {
    alert('a')
  }

}
