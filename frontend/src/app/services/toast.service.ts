import { Injectable } from '@angular/core';

export interface ToastOptions {
  text: string;
  duration?: number;
  close?: boolean;
  gravity?: 'top' | 'bottom';
  position?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  className?: string;
  stopOnFocus?: boolean;
  onClick?: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private defaultOptions: Partial<ToastOptions> = {
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    stopOnFocus: true,
  };

  private getToastify(): any {
    if (typeof window !== 'undefined' && window.Toastify) {
      return window.Toastify;
    }
    throw new Error('Toastify is not loaded. Make sure toastify.js is included in angular.json scripts.');
  }

  show(options: ToastOptions): void {
    const Toastify = this.getToastify();
    const config = { ...this.defaultOptions, ...options };
    Toastify(config).showToast();
  }

  success(message: string, title?: string): void {
    this.show({
      text: title ? `${title}: ${message}` : message,
      backgroundColor: 'var(--color-success)',
      className: 'toastify-success',
    });
  }

  error(message: string, title?: string): void {
    this.show({
      text: title ? `${title}: ${message}` : message,
      backgroundColor: 'var(--color-error)',
      className: 'toastify-error',
    });
  }

  warning(message: string, title?: string): void {
    this.show({
      text: title ? `${title}: ${message}` : message,
      backgroundColor: 'var(--color-warning)',
      className: 'toastify-warning',
    });
  }

  info(message: string, title?: string): void {
    this.show({
      text: title ? `${title}: ${message}` : message,
      backgroundColor: 'var(--color-info)',
      className: 'toastify-info',
    });
  }
}
