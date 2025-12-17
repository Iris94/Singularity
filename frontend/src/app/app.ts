import {
  Component,
  signal,
  OnInit,
} from '@angular/core';
import {
  RouterOutlet,
  Router,
  Event,
  NavigationEnd,
} from '@angular/router';
import { Header } from './components/layouts/header/header';
import { LoginModal } from './components/overlays/modals/login-modal/login-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, LoginModal],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('frontend');

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => window.HSStaticMethods.autoInit(), 100);

    this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          setTimeout(
            () =>
              window.HSStaticMethods.autoInit(),
            100,
          );
        }
      },
    );
  }
}
