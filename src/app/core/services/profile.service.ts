import { Injectable } from '@angular/core';
import { IProfile } from '../interface/profile.interface';
import { HttpService } from './http.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profile: IProfile;
  userName: Subject<string> = new Subject();

  constructor(public httpService: HttpService) { }

  followUser(userName) {
    this.httpService.followUser(userName)
    .subscribe(res => console.log(res));
  }

  unfollowUser(userName) {
    this.httpService.unfollowUser(userName)
    .subscribe(res => res);
  }
}
