import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = signal(false);

  login() {
    this.isLoggedIn.set(true);
  }

  logout() {
    this.isLoggedIn.set(false);
    window.localStorage.removeItem('authToken');
  }

  checkLoginStatus() {
    return this.isLoggedIn();
  }

  getToken() {
    const token = window.localStorage.getItem('authToken');
    return token ? token : null;
  }
}
