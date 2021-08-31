import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `
    <div mat-card-avatar class="example-header-image"></div>
    <mat-card-title>{{ name }}</mat-card-title>
    <mat-card-subtitle
      >width:{{ width }}, height:{{ height }}</mat-card-subtitle
    >
  `,
  styles: [
    `
      h1 {
        font-family: Lato;
      }
    `
  ]
})
export class HelloComponent {
  @Input() name: string;
  @Input() width: string;
  @Input() height: string;
}
