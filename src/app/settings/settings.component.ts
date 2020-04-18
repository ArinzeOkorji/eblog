import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpService } from '../core/services/http.service';
import { IUser } from '../core/interface/user.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
urlOfProfileImage: string;
username: string;
bio: string;
email: string;
newPassword: string;

  constructor(public authService: AuthService,
              private router: Router,
              public httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getUser()
    .subscribe(res => {
      console.log(res);
      const user: IUser = res.user;
      this.urlOfProfileImage = user.image;
      this.username = user.username;
      this.bio = user.bio;
      this.email = user.email;
    });
  }

  submit(form) {
    this.authService.getUseremail();
    /* this.httpService.updateUser(form.value)
    .subscribe(res => {
      console.log(res);
      if (res) {
        this.authService.deleteUser();
        this.authService.setUserDetails(res.user);
      }
    }); */

    /* if (form.controls.image.dirty) {
      delete form.value.image;
    }
    if (form.controls.username.dirty) {
      delete form.value.username;
    }
    if (form.controls.bio.dirty) {
      delete form.value.bio;
    }
    if (form.controls.email.dirty) {
      delete form.value.email;
    }
    if (form.controls.password.dirty) {
      delete form.value.password;
    } */
    if (form.value.token === '') {
      form.value.token = this.authService.userJWT;
    }
    console.log(form.value);

    this.httpService.updateUser(form.value)
    .subscribe(res => {
      console.log(form.value);
      console.log(res);
      if (res) {
        this.authService.deleteUser();
        this.authService.setUserDetails(res.user);
      }
    });

    /*if (this.authService.userEmail === form.value.email) {
      delete form.value.email;
      console.log(form);

    } else {
      console.log(form);
    } else {
      this.httpService.updateUser(form.value)
    .subscribe(res => {
      console.log(form.value);
      console.log(res);
      if (res) {
        this.authService.deleteUser();
        this.authService.setUserDetails(res.user);
      }
    });
    } */
  }

  logOut() {
    this.authService.deleteUser();
    this.router.navigate(['/']);
  }
}
