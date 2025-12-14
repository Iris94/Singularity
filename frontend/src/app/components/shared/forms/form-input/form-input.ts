import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './form-input.html',
  styleUrl: './form-input.css',
})
export class FormInput {
  // FormControl koji se prosleđuje iz parent komponente
  control = input.required<FormControl>();

  // Opcioni inputi za customizaciju
  label = input<string>('');
  placeholder = input<string>('');
  type = input<string>('text');
  icon = input<any>(); // Lucide ikonica - opciono, ako nije prosleđena ne prikazuje se
  inputId = input<string>(''); // Unique ID za input
}
