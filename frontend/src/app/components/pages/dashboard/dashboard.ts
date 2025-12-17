import { Component, inject } from '@angular/core';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private toastService = inject(ToastService);

  successMessage = '';
  errorMessage = '';

  triggerSuccess() {
    this.successMessage = 'Success message triggered!';
    this.errorMessage = '';
    this.toastService.success('Success message triggered!', 'Success');
  }

  triggerError() {
    this.errorMessage = 'Error message triggered!';
    this.successMessage = '';
    this.toastService.error('Error message triggered!', 'Error');
  }
}
