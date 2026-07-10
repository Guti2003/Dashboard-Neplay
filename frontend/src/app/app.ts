import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalLoader } from './shared/components/global-loader/global-loader';
import { ToastContainer } from './shared/components/toast-container/toast-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalLoader, ToastContainer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
