import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Login } from '../../models/login';
import { AuthService } from '../../services/auth.sevice';
import { Route } from '@angular/router/src/config';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    model= new Login();
    loading = false;
    error = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
  }
    login() {
        this.loading = true;
        console.log(this.model.email);
        this.authService.login(this.model.email, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}
