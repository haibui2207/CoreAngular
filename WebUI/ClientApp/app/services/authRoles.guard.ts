import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PLATFORM_ID } from '@angular/core';
import { AuthService } from '../services/auth.sevice';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthrolesGuard implements CanActivate {

    private token: string;

    constructor(private auth: AuthService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
  
    }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        let currentUser = this.auth.getCurrentUser();
        let userLoggedIn = this.auth.getUserLoggedIn();
        console.log(`Current User: ${currentUser}`);
        console.log(`userLoggedIn : ${userLoggedIn}`);
        
        if (!currentUser) {
            this.router.navigate(['/login-form']);
            return false;
        }
        else {
            this.auth.loggedIn.next(true);
            if (window.localStorage.getItem('role') == "Admin")
                this.auth.rolesAdmin.next(true);
            return true;
        };
    }
   
}
