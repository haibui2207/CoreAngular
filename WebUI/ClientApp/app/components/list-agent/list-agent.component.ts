import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserProfile } from '../../models/userProfile';
import { UserService } from '../../services/user.service';
import { Route } from '@angular/router/src/config';


@Component({
  selector: 'app-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.css']
})
export class ListAgentComponent implements OnInit {
    model: UserProfile[];
    error = '';
    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getProfiles();
    }
    getProfiles() {
        this.userService.getProfiles()
            .subscribe(result => this.model = result);
    }


}
