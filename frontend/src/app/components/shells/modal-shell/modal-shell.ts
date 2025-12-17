import { Component, input } from '@angular/core';

@Component({
  selector: 'app-modal-shell',
  imports: [],
  templateUrl: './modal-shell.html',
  styleUrl: './modal-shell.css',
})
export class ModalShell {
  title = input<string>('');
  modalId = input<string>('app-modal');

  closeModal(event: Event) {
    const target = event.target as HTMLElement;
    const currentTarget = event.currentTarget as HTMLElement;
    const contentDiv = currentTarget.querySelector(
      '.pointer-events-auto',
    ) as HTMLElement;

    if (target === currentTarget || (contentDiv && !contentDiv.contains(target))) {
      event.stopPropagation();
      
      const closeButton = document.querySelector(
        `[data-hs-overlay="#${this.modalId()}"]`,
      ) as HTMLElement;
      if (closeButton) {
        closeButton.click();
      }
    }
  }
}
