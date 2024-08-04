import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule,HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { WebReqInterceptor } from './webreg.interceptor';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from './task.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    RouterModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true },TaskService, provideHttpClient() ],
  bootstrap: [AppComponent]
})
export class AppModule { }
