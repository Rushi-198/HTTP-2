import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PostdashboardComponent } from './shared/component/postdashboard/postdashboard.component';
import { PostformComponent } from './shared/component/postform/postform.component';
import { NavbarComponent } from './shared/component/navbar/navbar.component'
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    PostdashboardComponent,
    PostformComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
