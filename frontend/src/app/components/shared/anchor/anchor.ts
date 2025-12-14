import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-anchor',
  imports: [RouterLink],
  templateUrl: './anchor.html',
  styleUrl: './anchor.css',
})
export class Anchor {
  label = input<string>('');
  href = input<string>('');
  routerLink = input<string>('');
  overlayTarget = input<string>('');
}
