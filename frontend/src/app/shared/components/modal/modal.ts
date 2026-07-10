import { Component, HostListener, input, output } from '@angular/core';
import { GlassShineDirective } from '../../directives/glass-shine.directive';

@Component({
  selector: 'app-modal',
  imports: [GlassShineDirective],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  readonly title = input('');
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  readonly close = output<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close.emit();
  }
}
