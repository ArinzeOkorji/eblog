import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment, UrlSegmentGroup } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export function isLogin(url: UrlSegment[], group: UrlSegmentGroup) {
  return group.segments.length === 1 && group.segments[0].path.endsWith('login') ? ({consumed: url}) : null;
}

export function isRegister(url: UrlSegment[], group: UrlSegmentGroup) {
  return group.segments.length === 1 && group.segments[0].path.endsWith('register') ? ({consumed: url}) : null;
}

const routes: Routes = [
  /* { path: '', component: AuthComponent, children: [
  { path: 'login', component: SignInComponent},
  { path: 'register', component: SignUpComponent}
  ] } */
  { path: 'login', component: SignInComponent, matcher: isLogin},
  { path: 'register', component: SignUpComponent, matcher: isRegister}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
