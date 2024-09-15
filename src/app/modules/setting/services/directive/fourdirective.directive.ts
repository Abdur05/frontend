import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFourdirective]'
})
export class FourdirectiveDirective {

  private maxLength: number = 4;

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement: HTMLInputElement = this.el.nativeElement;

    const value: string = inputElement.value;

    if (value.length >= this.maxLength) {
      inputElement.value = value.slice(0, this.maxLength); // Trim the input
      event.preventDefault();
    }
  }
}
