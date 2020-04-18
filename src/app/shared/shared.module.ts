import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TagsComponent } from './tags/tags.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { SingleArticleComponent } from './single-article/single-article.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [HeaderComponent, TagsComponent, SpinnerComponent, SingleArticleComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    TagsComponent,
    SpinnerComponent,
    SingleArticleComponent,
    FooterComponent
  ]
})
export class SharedModule { }
