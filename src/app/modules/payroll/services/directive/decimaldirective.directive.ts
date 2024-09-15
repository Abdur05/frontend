import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDecimaldirective]'
})
export class DecimaldirectiveDirective {

  constructor(private ngControl: NgControl) { }

  @HostListener('input', ['$event']) onInput(event: Event) {
    const value = this.ngControl.value;
    if (value != null && !/^\d+$/.test(value)) {
      this.ngControl.control?.setValue(value.replace(/\D/g, ''));
    }
  }



}
