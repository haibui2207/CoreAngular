import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


import { AuthService } from '../services/auth.sevice';

@Injectable()
export class AuthguardGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.auth.getUserLoggedIn()) {
            this.router.navigate(['/login-form']);
            return false;
        } else {
            return true;
        }
    }
}
