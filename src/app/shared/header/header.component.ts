import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,
              public profileService: ProfileService,
              private router: Router) { }

  ngOnInit() {
    this.authService.getUserDetails();
  }

  goToProfile(username: string) {
    this.profileService.userName.next(username);
    this.router.navigate([`/profile/${username}`]);
  }
}
