import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.html',
  styleUrl: './global-loader.css',
})
export class GlobalLoader {
  private readonly loadingService = inject(LoadingService);

  readonly isLoading = this.loadingService.isLoading;
}
