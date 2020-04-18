import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ErrorClass } from 'src/app/core/error.class';
import { IUser } from 'src/app/core/interface/user.interface';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  errorMessage: string;

  constructor(public httpService: HttpService,
              public authService: AuthService,
              public router: Router) { }

  ngOnInit() {
  }

  submit(form) {
    if (!form.value.email || !form.value.password) {
      this.errorMessage = 'Please fill all fields.';
      return;
    } else {
      this.errorMessage = '';
    }

    this.httpService.logIn(form.value)
    .subscribe((res: {user: IUser}) => {
      this.authService.setUserDetails(res.user);
      this.authService.getUserDetails();

      if (this.authService.userName) {
        this.router.navigate(['/']);
      }
    },
      (error: ErrorClass) => {
        this.errorMessage = error.message.split(':')[0];
      });
  }

}
