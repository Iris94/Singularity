import { Component, input } from '@angular/core';
import { LucideAngularModule, AlertCircle, CheckCircle } from 'lucide-angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-form-select',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './form-select.html',
  styleUrl: './form-select.css',
})
export class FormSelect {
  control = input.required<FormControl>();

  label = input<string>('');
  placeholder = input<string>('Open this select menu');
  icon = input<any>();
  inputId = input<string>('');
  options = input.required<SelectOption[]>();
  required = input<boolean>(false);
  error = input<string>('');
  validation = input<string>('');

  AlertCircleIcon = AlertCircle;
  CheckCircleIcon = CheckCircle;
}
