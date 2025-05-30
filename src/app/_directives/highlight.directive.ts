import { Directive, ElementRef, HostListener, inject, Input } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {
  @Input() highlight = '';
  @Input() defaultColor = '';
  private hostRef = inject(ElementRef);

  constructor() { 
  
  }

  @HostListener('mouseenter') onMouseEnter() {      
    this.setBackground(this.highlight||this.defaultColor||'red')
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBackground('');
  }

  private setBackground = (color: string) => {
    this.hostRef.nativeElement.style.backgroundColor = color;
  }
}
