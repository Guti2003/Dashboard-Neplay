import { Directive, ElementRef, inject } from '@angular/core';

/**
 * Makes a `.glass-panel`'s specular highlight follow the pointer, like
 * light sliding across a real pane of glass as you move around it.
 * Listens only on the host element (not window), so idle panels cost
 * nothing. On pointer leave the highlight is deliberately left where it
 * last was instead of snapping back to its default spot — that snap-back
 * read as an abrupt, unnatural jump.
 */
@Directive({
  selector: '[appGlassShine]',
  host: {
    '(pointermove)': 'onPointerMove($event)',
  },
})
export class GlassShineDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  onPointerMove(event: PointerEvent): void {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    this.elementRef.nativeElement.style.setProperty('--mx', `${x}%`);
    this.elementRef.nativeElement.style.setProperty('--my', `${y}%`);
  }
}
