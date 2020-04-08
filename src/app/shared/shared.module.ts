import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TagsComponent } from './tags/tags.component';



@NgModule({
  declarations: [HeaderComponent, TagsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    TagsComponent
  ]
})
export class SharedModule { }
