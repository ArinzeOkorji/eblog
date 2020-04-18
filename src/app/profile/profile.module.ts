import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SharedModule } from '../shared/shared.module';
import { ArticlesComponent } from './articles/articles.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [ProfileComponent, FavoritesComponent, ArticlesComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class ProfileModule { }
