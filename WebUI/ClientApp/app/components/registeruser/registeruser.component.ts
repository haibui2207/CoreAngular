import { Component, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { RegisterService } from '../../services/register.service';
import {Router } from '@angular/router';
@Component({
    selector: 'registeruser',
    templateUrl: './registeruser.component.html'
})
export class RegisterUserComponent {
    sMsgsc: any;
    sMsger: any;
    sMsgJson: any;
    email: any;
    password: any;
    confirmpassword: any;
    sUserislog: string;
    err: any;
    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string, private myservice: RegisterService, private router: Router) {
    }
    onClickSubmit(dataform: any) {
        //this.http.post('https://localhost:44342/api/Auth/RegisterUser', dataform).subscribe(result => {
        //    this.sMsg = result.json()
        //}, (error: Response) => {
        //    this.sMsg = error.text();
        //});
        //this.todaydate = this.myservice.showTodayDate(dataform);
        if (this.myservice.checkToken()) {
            this.myservice.registerUser(dataform)
                .subscribe(
                result => {
                    this.sMsgsc = result.toString();
                },
                (error: Response) => {
                    this.sMsger = error.text();
                    this.sMsgJson = JSON.parse(this.sMsger);
                    this.email = this.sMsgJson.Email;
                    this.password = this.sMsgJson.Password;
                    this.confirmpassword = this.sMsgJson.ConfirmPassword;
                    this.err = this.sMsgJson.err;
                }
                );
        }
        else {
            this.sUserislog = "user logged in";
            this.router.navigate(['/home']);
        }
    }
    //checkToken() {
    //    var currentUser = localStorage.getItem("currentUser");
    //    if (currentUser == null) {
    //        return true;
    //    }
    //    else {
    //        false;
    //    }
            
    //}
}