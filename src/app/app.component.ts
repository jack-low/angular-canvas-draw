import {
  Component,
  VERSION,
  ViewChild,
  ElementRef,
  Renderer2,
  OnInit,
  AfterViewInit
} from '@angular/core';

import { DrawService, DrawEvent } from './services/draw.service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  name = 'Angular ' + VERSION.major;
  width: number = 400;
  height: number = 400;
  value: number = 3;
  public drawEvent!: DrawEvent;

  @ViewChild('mainCard') MainCard!: ElementRef;

  constructor(private renderer: Renderer2, private drawService: DrawService) {}
  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.renderer.createElement('canvas');
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    const cx: CanvasRenderingContext2D = canvasEl.getContext('2d')!;
    cx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    cx.lineWidth = canvasEl.width * (this.value / canvasEl.width);
    cx.lineCap = 'round';
    cx.strokeStyle = `#ff0000`;
    this.renderer.appendChild(this.MainCard.nativeElement, canvasEl);
    this.drawService.captureEvents(canvasEl, this.drawEvent);
  }
  ngOnInit(): void {
  }
}
