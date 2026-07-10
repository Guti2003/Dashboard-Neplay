import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { GlassShineDirective } from '../../shared/directives/glass-shine.directive';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, GlassShineDirective],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  readonly showPassword = signal(false);
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.authService.login(this.form.getRawValue()).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: (error: HttpErrorResponse) => {
        this.loading.set(false);
        this.errorMessage.set(this.resolveErrorMessage(error));
      },
    });
  }

  private resolveErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 401) {
      return 'Correo o contraseña incorrectos.';
    }
    if (error.status === 422) {
      return 'Verifica los datos ingresados.';
    }
    return 'No se pudo conectar con el servidor. Intenta nuevamente.';
  }
}
