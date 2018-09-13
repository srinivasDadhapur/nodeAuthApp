import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { DataService } from './services/data.service';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ValidateService } from './services/validate.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { LoginAuthGuard } from './login-auth.guard';


const appRoutes: Routes =[
  {path: '', component:HomeComponent,canActivate:[LoginAuthGuard]},
  {path: 'register', component:RegisterComponent,canActivate:[LoginAuthGuard]},
  {path: 'login', component:LoginComponent,canActivate:[LoginAuthGuard]},
  {path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  {path: 'profile', component:ProfileComponent,canActivate:[AuthGuard]}

];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AboutComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    HttpClientModule
  ],
  providers: [DataService,ValidateService,FlashMessagesService,AuthService, AuthGuard, LoginAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
