import { NgIf } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

var dynamicId = 0;

@Component({
  selector: 'mui-text-field',
  imports: [FormsModule, NgIf],
  templateUrl: './mui-text-field.component.html',
  styleUrl: './mui-text-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MuiTextFieldComponent,
    },
  ],
})
export class MuiTextFieldComponent
  implements AfterViewInit, ControlValueAccessor
{
  @ViewChild('txt') txt!: ElementRef;

  // ngModel to bind on parent component
  @Input({ required: true }) ngModel!: any;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter<any>();

  // internal ngModel validation
  @Input({ required: true }) muiLabel!: string;
  @Input() required: '' | string | boolean = false;
  @Input() email: '' | string | boolean = false;
  @Input() minlength: '' | string | number | null = null;
  @Input() maxlength: '' | string | number | null = null;
  @Input() muiClearable = false;
  @Input() muiStyle: 'filled' | 'outlined' = 'filled';

  uniqueId = 'muitf' + dynamicId;
  focused = false;

  constructor() {
    dynamicId++;
  }

  ngAfterViewInit() {
    return null;
  }

  // Control value Accessor implements
  cvaOnChange = (a: any) => a;
  cvaOnTouched = () => null;
  registerOnChange(fn: any): void {
    this.cvaOnChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.cvaOnTouched = fn;
  }
  writeValue(obj: any): void {
    return obj;
  }
  // End of Control Value Accessor implements

  onFocus = () => {
    this.focused = true;
    this.cvaOnTouched();
  };

  onBlur = () => {
    this.focused = false;
  };

  onInput = (txt: string) => {
    this.cvaOnChange(txt);
  };

  clearInput = () => {
    this.ngModelChange.emit('');
  };
}
