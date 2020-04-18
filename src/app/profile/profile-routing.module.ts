import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ArticlesComponent } from './articles/articles.component';
import { AuthGuard } from '../core/auth.guard';

const routes: Routes = [
  { path: '', component: ProfileComponent, children: [
    {path: ':username/favorites', component: FavoritesComponent, canActivate: [AuthGuard]},
    {path: ':username', component: ArticlesComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
