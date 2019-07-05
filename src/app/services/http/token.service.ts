import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  constructor(
  ) { }

  setToken(token) {
    localStorage.setItem('admin_system_angular_token', JSON.stringify(token));
  }

  getToken() {
    const token = JSON.parse(localStorage.getItem('admin_system_angular_token'));
    return token;
  }

  deleteToken() {
    localStorage.removeItem('admin_system_angular_token');
  }

  getTokenPayload() {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = JSON.parse(window.atob(payload));
    }
    return payload;
  }
}
