import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormInput } from '../../shared/forms/form-input/form-input';
import { FormSelect, SelectOption } from '../../shared/forms/form-select/form-select';
import { Mail, User, Lock } from 'lucide-angular';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormInput, FormSelect, JsonPipe],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  MailIcon = Mail;
  UserIcon = User;
  LockIcon = Lock;

  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    age: new FormControl(''),
    profession: new FormControl(''),
    gender: new FormControl(''),
  });

  professionOptions: SelectOption[] = [
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'manager', label: 'Manager' },
    { value: 'student', label: 'Student' },
    { value: 'other', label: 'Other' },
  ];

  genderOptions: SelectOption[] = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  ];

  submittedValues: any = null;

  onSubmit() {
    if (this.registerForm.valid) {
      this.submittedValues = this.registerForm.value;
      console.log('Registration submitted:', this.submittedValues);
    }
  }
}
