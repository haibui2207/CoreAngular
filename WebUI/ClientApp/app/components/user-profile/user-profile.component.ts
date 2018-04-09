import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserProfile } from '../../models/userProfile';
import { UserService } from '../../services/user.service';
import { Route } from '@angular/router/src/config';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    model = new UserProfile();
    error = '';
    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getProfile();
    }
    getProfile() {
        this.userService.getProfile()
            .subscribe(result => {
                this.model.avatarURL = result.avatarURL,
                this.model.email = result.email,
                this.model.userName = result.userName
            });
    }

}
