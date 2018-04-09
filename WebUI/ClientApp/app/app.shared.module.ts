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


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        ForgotPasswordComponent,
        RegisterUserComponent
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
            { path: '**', redirectTo: 'home' }
           
        ])
    ],
    providers: [DataserviceService, RegisterService],
    bootstrap: [AppComponent]
})
export class AppModuleShared {
}
