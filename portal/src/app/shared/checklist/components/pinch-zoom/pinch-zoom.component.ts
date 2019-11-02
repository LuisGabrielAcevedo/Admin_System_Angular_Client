import {
  Component,
  HostBinding,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { pairwise, map, filter } from 'rxjs/operators';

@Component({
  selector: 'pinch-zoom, [pinch-zoom]',
  templateUrl: './pinch-zoom.component.html',
  styleUrls: ['./pinch-zoom.component.css']
})
export class PinchZoomComponent implements OnInit {
  private _scale = 1;
  /* Inputs */
  @Input()
  get scale() {
    return this._scale;
  }
  set scale(scale: number) {
    this._scale = scale;
    if (this.element) {
      this.transformElement();
    }
  }

  // @Input()
  // scale: number = 1;
  initialScale: number = 1;
  element;
  elementTarget;
  elementPosition;
  parentElement;
  startX: number;
  startY: number;
  moveX: number = 0;
  moveY: number = 0;
  initialMoveX: number = 0;
  initialMoveY: number = 0;
  draggingMode: boolean = false;

  @Input() ZOOM_STEP = 0.25;
  @Input('transition-duration') transitionDuration = 200;
  @Input('zoom-button') zoomButton = true;
  @Input('auto-zoom-out') autoZoomOut = false;
  @Input('limit-zoom') limitZoom: number;
  @Input() width: string = '600px';
  @Input() height: string = '300px';

  @Output() events: EventEmitter<any> = new EventEmitter<any>();

  @HostBinding('style.display') hostDisplay: string;
  @HostBinding('style.overflow') hostOverflow: string;

  @ViewChild('content', null) contentElement: ElementRef;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.element = this.contentElement.nativeElement;
    this.parentElement = this.elementRef.nativeElement;
    this.elementTarget = this.element.querySelector('*').tagName;

    this.setBasicStyles();

    this.element.ondragstart = () => false;

    fromEvent(this.element, 'mousemove')
      .pipe(
        map(evento => evento as any),
        pairwise(),
        filter(_ => this.draggingMode)
      )
      .subscribe(([event, event2]) => {
        this.elementRef.nativeElement.scrollTop =
          this.elementRef.nativeElement.scrollTop + event.y - event2.y;
        this.elementRef.nativeElement.scrollLeft =
          this.elementRef.nativeElement.scrollLeft + event.x - event2.x;
      });
  }

  /*
   * Desktop listeners
   */

  @HostListener('mousedown', ['$event'])
  onMouseEnter(event: MouseEvent): void {
    this.getElementPosition();

    this.draggingMode = true;
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.draggingMode = false;
    this.updateInitialValues();
  }

  /*
   * Mobile listeners
   */

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setImageWidth();
    this.transformElement(this.transitionDuration);
  }

  /*
   * Handlers
   */

  moveLeft(index: number, touches): number {
    return touches[index].clientX - this.elementPosition.left;
  }

  moveTop(index: number, touches): number {
    return touches[index].clientY - this.elementPosition.top;
  }

  getImageHeight(): number {
    return this.element.getElementsByTagName(this.elementTarget)[0]
      .offsetHeight;
  }

  getImageWidth(): number {
    return this.element.getElementsByTagName(this.elementTarget)[0].offsetWidth;
  }

  getStartPosition(event): void {
    this.startX = event.touches[0].clientX - this.elementPosition.left;
    this.startY = event.touches[0].clientY - this.elementPosition.top;
  }

  setBasicStyles(): void {
    this.element.style.display = 'block';
    // this.element.style['max-width'] = this.width;
    // this.element.style['max-height'] = this.height;
    this.element.style.transformOrigin = '0 0';
    //this.element.style.overflow = 'scroll';

    this.hostDisplay = 'block';
    this.hostOverflow = 'auto';

    this.setImageWidth();
  }

  setImageWidth(): void {
    const imgElement = this.element.getElementsByTagName(this.elementTarget);

    if (imgElement.length) {
      imgElement[0].style.maxWidth = '100%';
      imgElement[0].style.maxHeight = '100%';
    }
  }

  transformElement(duration: number = 50) {
    this.element.style.transition = `all ${duration}ms`;
    this.element.style.transform = `
          matrix(${Number(this.scale)}, 0, 0, ${Number(this.scale)}, ${Number(
      this.moveX
    )}, ${Number(this.moveY)})`;
  }

  public toggleZoom(event: any = false): void {
    this.resetScale();
  }

  public moreZoom() {
    this.scale = this.initialScale + this.ZOOM_STEP;
    this.transformElement(this.transitionDuration);
  }

  public lessZoom() {
    if (this.initialScale - this.ZOOM_STEP > 0) {
      this.scale = this.initialScale - this.ZOOM_STEP;
      this.transformElement(this.transitionDuration);
    }
  }

  resetScale(): void {
    this.scale = 1;
    this.moveX = 0;
    this.moveY = 0;
    this.updateInitialValues();
    this.transformElement(this.transitionDuration);
  }

  updateInitialValues(): void {
    this.initialScale = this.scale;
    this.initialMoveX = this.moveX;
    this.initialMoveY = this.moveY;
  }

  getElementPosition(): void {
    this.elementPosition = this.elementRef.nativeElement.getBoundingClientRect();
  }
}
