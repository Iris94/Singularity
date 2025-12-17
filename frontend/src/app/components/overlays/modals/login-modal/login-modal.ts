import { Component, inject } from '@angular/core';
import { ModalShell } from '../../../shells/modal-shell/modal-shell';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInput } from '../../../shared/forms/form-input/form-input';
import { Mail, Lock } from 'lucide-angular';
import { Anchor } from '../../../shared/anchor/anchor';
import { AuthService } from '../../../../services/api/auth.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-login-modal',
  imports: [ModalShell, ReactiveFormsModule, FormInput, Anchor],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.css',
})
export class LoginModal {
  private authService = inject(AuthService);
  private userService = inject(UserService);

  MailIcon = Mail;
  LockIcon = Lock;

  loginForm = new FormGroup({
    usernameOrEmail: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessage = '';
  isLoading = false;

  getUsernameOrEmailError(): string {
    const control = this.loginForm.controls.usernameOrEmail;
    if (control.invalid && (control.touched || control.dirty)) {
      if (control.hasError('required')) {
        return 'Username or email is required.';
      }
    }
    return '';
  }

  getPasswordError(): string {
    const control = this.loginForm.controls.password;
    if (control.invalid && (control.touched || control.dirty)) {
      if (control.hasError('required')) {
        return 'Password is required.';
      }
    }
    return '';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.errorMessage = '';
      this.isLoading = true;

      const formValue = this.loginForm.value;
      const usernameOrEmail = formValue.usernameOrEmail!;
      const isEmail = usernameOrEmail.includes('@');

      const credentials = {
        [isEmail ? 'email' : 'username']: usernameOrEmail,
        password: formValue.password!,
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.accessToken);
          this.userService.setUser(response.user);
          this.loginForm.reset();
          this.isLoading = false;

          const modalElement = document.getElementById('sign-in-modal');
          if (modalElement && window.HSStaticMethods) {
            window.HSStaticMethods.autoInit();
            const closeButton = modalElement.querySelector('[data-hs-overlay]') as HTMLElement;
            if (closeButton) {
              closeButton.click();
            }
          }
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
          this.isLoading = false;
        },
      });
    }
  }
}
