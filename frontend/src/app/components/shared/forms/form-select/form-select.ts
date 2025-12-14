import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
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
  // FormControl koji se prosleđuje iz parent komponente
  control = input.required<FormControl>();

  // Opcioni inputi za customizaciju
  label = input<string>('');
  placeholder = input<string>('Open this select menu');
  icon = input<any>(); // Lucide ikonica - opciono
  inputId = input<string>(''); // Unique ID za select
  options = input.required<SelectOption[]>(); // Array opcija
}
