import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { ForgotPasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { RegisterUserComponent } from './components/registeruser/registeruser.component';

import { DataserviceService } from './services/dataservice.service';
import { RegisterService } from './services/register.service';


import { LoginFormComponent } from './components/login-form/login-form.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ListAgentComponent } from './components/list-agent/list-agent.component';

import { AuthService } from '../app/services/auth.sevice';
import { UserService } from '../app/services/user.service';
import { UserProfile } from './models/userProfile';



@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        ForgotPasswordComponent,
        RegisterUserComponent,
        LoginFormComponent,
        UserProfileComponent,
        ListAgentComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent },
            { path: 'register-user', component: RegisterUserComponent },
            { path: 'login-form', component: LoginFormComponent },
            { path: 'user-profile', component: UserProfileComponent },
            { path: 'list-agent', component: ListAgentComponent },
            { path: '**', redirectTo: 'home' }
           
        ])
    ],
    providers: [
        DataserviceService,
        RegisterService,
        AuthService,
        UserService],
    bootstrap: [AppComponent]
})
export class AppModuleShared {
}
