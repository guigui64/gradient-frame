import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { MainComponent } from './components/main/main.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ImageFormComponent } from './components/image-form/image-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SigninComponent,
    RegisterComponent,
    NavbarComponent,
    ImageFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
