import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlassShineDirective } from '../../shared/directives/glass-shine.directive';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, GlassShineDirective],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {}
