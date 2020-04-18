import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { Md5 } from 'ts-md5';
import { AddHeader } from './core/interceptor/addHeader.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    MarkdownModule.forRoot()
  ],
  providers: [Md5,
  {provide: HTTP_INTERCEPTORS, useClass: AddHeader, multi: true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
