import { Injectable } from '@angular/core';

import { switchMap, takeUntil, pairwise } from 'rxjs/operators';

import { merge, fromEvent } from 'rxjs';

export interface DrawEvent {
  type: string;
  view: boolean;
}
export interface DrawCanvas {
  el: HTMLCanvasElement;
}
export interface Pos {
  x: number;
  y: number;
}
@Injectable({
  providedIn: 'root'
})
export class DrawService {
  // 参考サイト: https://medium.com/@tarik.nzl/creating-a-canvas-component-with-free-hand-drawing-with-rxjs-and-angular-61279f577415

  debug: boolean = true;
  debugLog!: any;
  smartphone: boolean = false;
  constructor() {
    const userAgent = window.navigator.userAgent;
    console.log(userAgent);
    if (
      userAgent.indexOf('iphone') != -1 ||
      userAgent.indexOf('ipad') != -1 ||
      userAgent.indexOf('Android') != -1
    ) {
      this.smartphone = true;
    } else {
    }
  }
  captureEvents(canvasEl: HTMLCanvasElement, drawEvent: DrawEvent) {
    if (!this.smartphone) {
      return fromEvent(canvasEl, 'mousedown')
        .pipe(
          switchMap(e => {
            e.preventDefault();
            return fromEvent(canvasEl, 'mousemove').pipe(
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              pairwise()
            );
          })
        )
        .subscribe((res: [MouseEvent, MouseEvent]) => {
          const rect = canvasEl.getBoundingClientRect(),
            scaleX = canvasEl.width / rect.width,
            scaleY = canvasEl.height / rect.height,
            ctx: CanvasRenderingContext2D = canvasEl.getContext('2d')!;
          const prevPos = {
            x: (res[0].clientX - rect.left) * scaleX,
            y: (res[0].clientY - rect.top) * scaleY
          };
          const currentPos = {
            x: (res[1].clientX - rect.left) * scaleX,
            y: (res[1].clientY - rect.top) * scaleY
          };
          this.drawOnCanvas(prevPos, currentPos, ctx);
        });
    } else {
      return fromEvent(canvasEl, 'touchstart')
        .pipe(
          switchMap(e => {
            e.preventDefault();
            return fromEvent(canvasEl, 'touchmove').pipe(
              takeUntil(fromEvent(canvasEl, 'touchend')),
              pairwise()
            );
          })
        )
        .subscribe((res: [TouchEvent, TouchEvent]) => {
          const rect = canvasEl.getBoundingClientRect(),
            scaleX = canvasEl.width / rect.width,
            scaleY = canvasEl.height / rect.height,
            ctx: CanvasRenderingContext2D = canvasEl.getContext('2d')!;
          const prevPos = {
            x: (res[0].touches[0].clientX - rect.left) * scaleX,
            y: (res[0].touches[0].clientY - rect.top) * scaleY
          };
          const currentPos = {
            x: (res[1].touches[0].clientX - rect.left) * scaleX,
            y: (res[1].touches[0].clientY - rect.top) * scaleY
          };
          this.drawOnCanvas(prevPos, currentPos, ctx);
        });
    }
  }

  public drawOnCanvas(
    prevPos: { x: number; y: number },
    currentPos: { x: number; y: number },
    ctx: CanvasRenderingContext2D
  ) {
    if (!ctx) {
      return;
    }
    ctx.beginPath();
    if (prevPos) {
      ctx.moveTo(prevPos.x, prevPos.y);
      ctx.lineTo(currentPos.x, currentPos.y);
      ctx.stroke();
    }
  }
}
