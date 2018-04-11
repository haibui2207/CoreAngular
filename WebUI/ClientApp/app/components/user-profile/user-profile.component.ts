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
    imageUrl: string;
    fileUpload: File;
    editAvatar: boolean = false;
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
    handleFileInput(file: FileList) {
        this.fileUpload = file.item(0);
        // Hien Image review
        var reader = new FileReader();
        reader.onload = (event: any) => {
            this.imageUrl = event.target.result;
        }
        reader.readAsDataURL(this.fileUpload);

    }

    OnSubmit(userName: string, Image: File) {
        this.userService.editProfile(this.model.userName, this.fileUpload).subscribe(result => {
            if (result) {
                this.model.avatarURL = this.imageUrl;
                this.editAvatar = false;
            } else {

            }
        });
    }

    private OnEdit(check: boolean): void {
        this.imageUrl = this.model.avatarURL;
        this.editAvatar = check;
    }

}
