import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../core/services/http.service';
import { ProfileService } from '../core/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  username: string;
  userProfile;
  userNameObservable;

  constructor(private route: ActivatedRoute, public httpService: HttpService, public profileService: ProfileService) { }

  ngOnInit() {
    this.userNameObservable = this.profileService.userName.subscribe(
      res => {
        this.username = '';
        this.username = res;
        console.log(this.username);

        this.httpService.getUserProfile(this.username)
    .subscribe(
      response => {
        this.profileService.profile = response.profile;
        console.log(this.profileService.profile);
      }
    );
      }
    );
    this.route.children[0].params.forEach((params: Params) => {
      console.log(params);
      this.username = '';
      this.username = params.username;
      console.log(this.username);

      this.httpService.getUserProfile(this.username)
    .subscribe(
      res => {
      if (res) {
        this.profileService.profile = res.profile;
        console.log(this.profileService.profile);
      }
      }
    );
    });
    /* this.route.children[0].paramMap
    .subscribe(res => {
      console.log(res);
      this.username = res.params.username;

      this.httpService.getUserProfile(this.username)
    .subscribe(
      res => {
        this.profileService.profile = res.profile;
        console.log(res);
      }
    );
    });*/


  }

  ngOnDestroy() {
    this.profileService.profile = undefined;
    this.userNameObservable.unsubscribe();
  }

}
