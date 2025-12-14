import { Component } from '@angular/core';
import { ModalShell } from '../../../shells/modal-shell/modal-shell';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormInput } from '../../../shared/forms/form-input/form-input';
import { Mail, User } from 'lucide-angular';
import { Anchor } from '../../../shared/anchor/anchor';

@Component({
  selector: 'app-login-modal',
  imports: [ModalShell, ReactiveFormsModule, FormInput, Anchor],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.css',
})
export class LoginModal {
  MailIcon = Mail;
  UserIcon = User;

  testForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  submittedValues: { firstName: string; lastName: string } | null = null;

  onSubmit() {
    if (this.testForm.valid) {
      this.submittedValues = {
        firstName: this.testForm.value.firstName || '',
        lastName: this.testForm.value.lastName || '',
      };
      console.log('Form submitted:', this.submittedValues);
    }
  }
}
