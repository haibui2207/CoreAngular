import { Component,OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth.sevice';
import { Router, Route } from '@angular/router';
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit{

    isLoggedIn$: Observable<boolean>;

    isRoleAdmin$: Observable<boolean>;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
       
        this.isLoggedIn$ = this.authService.isLoggedIn;
        this.isRoleAdmin$ = this.authService.isRoleAdmin;
       

    }

    onLogout() {
        this.authService.logout();
        this.authService.setUserLoggedIn(false);
        this.authService.setRoles(false);
        this.router.navigate(['/login-form']);
    }
}
