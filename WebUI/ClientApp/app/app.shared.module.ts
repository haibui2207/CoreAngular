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
import { ResetPasswordComponent } from './components/resetpassword/resetpassword.component';
import { RegisterUserComponent } from './components/registeruser/registeruser.component';

import { DataserviceService } from './services/dataservice.service';
import { RegisterService } from './services/register.service';
import { AuthguardGuard } from './services/authguard.guard';
import { LocalStorageModule, ILocalStorageServiceConfig } from 'angular-2-local-storage';
import { LocalStorageService } from 'angular-2-local-storage';


import { LoginFormComponent } from './components/login-form/login-form.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ListAgentComponent } from './components/list-agent/list-agent.component';
import { confirmEmailComponent } from './components/confirmemail/confirmemail.component';

import { AuthService } from '../app/services/auth.sevice';
import { UserService } from '../app/services/user.service';
import { UserProfile } from './models/userProfile';


let localStorageServiceConfig = {
    prefix: 'my-app',
    storageType: 'sessionStorage'
};
@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        RegisterUserComponent,
        LoginFormComponent,
        UserProfileComponent,
        ListAgentComponent,
        confirmEmailComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        LocalStorageModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, canActivate: [AuthguardGuard] },
            { path: 'counter', component: CounterComponent, canActivate: [AuthguardGuard] },
            { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthguardGuard] },
            { path: 'forgot-password', component: ForgotPasswordComponent },
            { path: 'reset-password/:userid', component: ResetPasswordComponent },
            { path: 'register-user', component: RegisterUserComponent },
            { path: 'login-form', component: LoginFormComponent },
            { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthguardGuard] },
            { path: 'list-agent', component: ListAgentComponent, canActivate: [AuthguardGuard]},
            { path: 'confirmEmail', component: confirmEmailComponent },
            { path: '**', redirectTo: 'home'}
           
        ])
    ],
    providers: [
        DataserviceService,
        RegisterService,
        AuthService,
        UserService,
        AuthguardGuard,
        LocalStorageService,
        
       
    ],
    bootstrap: [AppComponent]
})
export class AppModuleShared {
}
