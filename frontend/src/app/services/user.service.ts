import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser = signal<User | null>(null);

  setUser(user: User) {
    this.currentUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));
    if (user.id) {
      localStorage.setItem('userId', user.id);
    }
  }

  clearUser() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  }

  loadUserFromStorage() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUser.set(user);
      } catch (error) {
        this.clearUser();
      }
    }
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null && !!localStorage.getItem('token');
  }
}
