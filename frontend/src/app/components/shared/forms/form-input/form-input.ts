import { Component, input } from '@angular/core';
import { LucideAngularModule, AlertCircle, CheckCircle } from 'lucide-angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './form-input.html',
  styleUrl: './form-input.css',
})
export class FormInput {
  control = input.required<FormControl>();
  label = input<string>('');
  placeholder = input<string>('');
  type = input<string>('text');
  icon = input<any>();
  inputId = input<string>('');
  error = input<string>('');
  validation = input<string>('');
  required = input<boolean>(false);

  AlertCircleIcon = AlertCircle;
  CheckCircleIcon = CheckCircle;
}
