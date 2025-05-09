/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-simple-input',
  imports: [],
  templateUrl: './simple-input.component.html',
  styleUrl: './simple-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SimpleInputComponent,
    },
  ],
})
export class SimpleInputComponent implements ControlValueAccessor {
  @Input() ngModel: any = '';
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter<any>();

  touched = false;
  disabled = false;

  onChange = (a: any) => a;
  onTouched = () => {
    if (this.touched == false) {
      this.touched = true;
    }
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(v: string): void {
    this.ngModel = v;
  }

  onFocus = () => {
    this.onTouched();
  };

  onBlur = () => {
    // console.log(this.value);
  };

  valueChange = (event: Event) => {
    console.log('value change');
    const target = event.target as HTMLInputElement;
    this.onChange(target.value);
    // this.writeValue(target.value);
  };
}
