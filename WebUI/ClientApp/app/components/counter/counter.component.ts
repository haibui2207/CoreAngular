import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { AuthService } from '../../services/auth.sevice';
import { Route } from '@angular/router/src/config';
import { Router } from '@angular/router';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit {
    public currentCount = 0;

    public incrementCounter() {
        this.currentCount++;
    }
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }
    ngOnInit() {

    }

  
}