import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../../services/dataservice.service';
import { ResetPasswordViewModel } from '../../models/resetpasswordviewmodel';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'resetpassword',
    templateUrl: './resetpassword.component.html',
    styleUrls: ['./resetpassword.component.css']
})
export class ResetPasswordComponent implements OnInit {
    successMessage: string;
    errorMessage: string;
    resetPasswordModel: ResetPasswordViewModel = new ResetPasswordViewModel();

    constructor(private dataService: DataserviceService,
        private route: ActivatedRoute,
        private location: Location) { }

    ngOnInit() {
        this.location.replaceState("reset-password");
        this.requestCodeResetPassword();        
    }   

    requestCodeResetPassword() {
        let userid = String(this.route.snapshot.paramMap.get('userid'));
        this.dataService.requestCodeResetPassword(userid)
            .subscribe(
            res => {                
                this.resetPasswordModel.code = res.code;
                this.resetPasswordModel.email = res.email;
            },
            err => {
                if (err.status != 0) this.errorMessage = err.text();
            });
    }

    requestResetEmail() {
        this.dataService.requestResetPassword(this.resetPasswordModel)
            .subscribe(
            res => {
                this.successMessage = res;
            },
            err => {
                this.resetPasswordModel.password = "";
                this.resetPasswordModel.confirmpassword ="";
                console.log(`err : ${JSON.stringify(err)}`);
                this.errorMessage = err.text();
            });
    }

}
