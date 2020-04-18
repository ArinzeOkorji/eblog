import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interface/user.interface';
import { ErrorClass } from 'src/app/core/error.class';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  errorMessage: string;

  constructor(public httpService: HttpService,
              public authService: AuthService,
              public router: Router) { }

  ngOnInit() {
  }

  submit(form) {
    if (!form.value.username || !form.value.email || !form.value.password) {
      this.errorMessage = 'Please fill all fields.';
      return;
    } else {
      this.errorMessage = '';
    }

    this.httpService.signUp(form.value)
    .subscribe(
      (res: {user: IUser}) => {
      console.log(res)
      this.authService.setUserDetails(res.user);
      this.authService.getUserJWT();
      this.authService.getUserDetails();

      if (this.authService.userName) {
        this.router.navigate(['/']);
      }
    }, (error: ErrorClass) => {
      this.errorMessage = error.message.split(':')[0];
    });

  }

}
