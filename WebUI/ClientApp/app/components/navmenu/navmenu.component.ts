import { Component,OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth.sevice';
import { Router, Route } from '@angular/router';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit{

    isLoggedIn$: Observable<boolean>;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.isLoggedIn$ = this.authService.isLoggedIn;
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}
