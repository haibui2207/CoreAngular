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
        let a = this.auth.getCurrentRole();
        if (a) {
            return true;
        }
        else {
            this.router.navigate(['/home']);
            return false;
        }

    }
   
}
