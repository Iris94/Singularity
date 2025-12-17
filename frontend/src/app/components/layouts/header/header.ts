import { Component, OnInit, inject } from '@angular/core';
import { Button } from '../../shared/button/button';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  imports: [Button],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  userService = inject(UserService);

  ngOnInit() {
    this.userService.loadUserFromStorage();
  }

  logout() {
    this.userService.clearUser();
  }
}
