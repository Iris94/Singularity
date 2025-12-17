import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInput } from '../../shared/forms/form-input/form-input';
import { Mail, User, Lock, Briefcase } from 'lucide-angular';
import { AuthService } from '../../../services/api/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormInput],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);

  MailIcon = Mail;
  UserIcon = User;
  LockIcon = Lock;
  BriefcaseIcon = Briefcase;

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    profession: new FormControl(''),
  });

  successMessage = '';
  errorMessage = '';

  getEmailError(): string {
    const emailControl = this.registerForm.controls.email;
    if (emailControl.invalid && (emailControl.touched || emailControl.dirty)) {
      if (emailControl.hasError('required')) {
        return 'Email is required.';
      }
      if (emailControl.hasError('email')) {
        return 'Please enter a valid email address.';
      }
    }
    return '';
  }

  getEmailValidation(): string {
    const emailControl = this.registerForm.controls.email;
    if (emailControl.valid && (emailControl.touched || emailControl.dirty)) {
      return 'Email is valid.';
    }
    return '';
  }

  getPasswordError(): string {
    const passwordControl = this.registerForm.controls.password;
    if (passwordControl.invalid && (passwordControl.touched || passwordControl.dirty)) {
      if (passwordControl.hasError('required')) {
        return 'Password is required.';
      }
      if (passwordControl.hasError('minlength')) {
        const minLength = passwordControl.getError('minlength')?.requiredLength;
        return `Password must be at least ${minLength} characters.`;
      }
    }
    return '';
  }

  getPasswordValidation(): string {
    const passwordControl = this.registerForm.controls.password;
    if (passwordControl.valid && (passwordControl.touched || passwordControl.dirty)) {
      return 'Password is valid.';
    }
    return '';
  }

  getUsernameError(): string {
    const usernameControl = this.registerForm.controls.username;
    if (usernameControl.invalid && (usernameControl.touched || usernameControl.dirty)) {
      if (usernameControl.hasError('required')) {
        return 'Username is required.';
      }
    }
    return '';
  }

  getUsernameValidation(): string {
    const usernameControl = this.registerForm.controls.username;
    if (usernameControl.valid && (usernameControl.touched || usernameControl.dirty)) {
      return 'Username is valid.';
    }
    return '';
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.successMessage = '';
      this.errorMessage = '';

      const formValue = this.registerForm.value;
      const userData = {
        username: formValue.username!,
        email: formValue.email!,
        password: formValue.password!,
        firstName: formValue.firstName || undefined,
        lastName: formValue.lastName || undefined,
        profession: formValue.profession || undefined,
      };

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.successMessage = response.message || 'Registration successful!';
          this.registerForm.reset();
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        },
      });
    }
  }
}
