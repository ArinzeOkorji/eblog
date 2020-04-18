import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userEmail;
  userName;
  userJWT;
  constructor() { }

  setUserDetails(user) {
    localStorage.setItem('email', user.email);
    localStorage.setItem('token', user.token);
    localStorage.setItem('userName', user.username);
  }
  getUserJWT() {
    this.userJWT = localStorage.getItem('token');
  }
  getUserDetails() {
    this.userName = localStorage.getItem('userName');
  }
  getUseremail() {
    this.userEmail = localStorage.getItem('email');
  }

  getDetails() {
    this.getUserDetails();
    this.getUserJWT();
    this.getUseremail();
  }

  isLoggedIn() {
    if (this.userJWT) {
      return true;
    }
  }

  deleteUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
  }
}
