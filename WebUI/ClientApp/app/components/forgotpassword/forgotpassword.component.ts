import { Component , OnInit} from '@angular/core';
import { DataserviceService } from '../../services/dataservice.service';
import { ForgotPasswordViewModel } from '../../models/forgotpasswordviewmodel';
import { ResetPasswordViewModel } from '../../models/resetpasswordviewmodel';

@Component({
    selector: 'forgotpassword',
    templateUrl: './forgotpassword.component.html',
    styleUrls: ['./forgotpassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    information: string;
    setEmailReadonly: boolean = false;
    forgotPasswordModel: ForgotPasswordViewModel = new ForgotPasswordViewModel();
    resetPasswordModel: ResetPasswordViewModel = new ResetPasswordViewModel();

    constructor(private dataService: DataserviceService) { }

    ngOnInit() { }

    validateEmail() {
        if (this.resetPasswordModel.code == null) {
            this.dataService.validateEmail(this.forgotPasswordModel.email)
                .subscribe(
                res => {
                    this.resetPasswordModel.email = this.forgotPasswordModel.email;
                    this.resetPasswordModel.code = res;
                    this.setEmailReadonly = true;
                    this.information = "";

                },
                err => {
                    console.log(`err : ${JSON.stringify(err)}`);
                    this.information = err.text();
                });
        }
        else {
            this.dataService.requestResetPassword(this.resetPasswordModel).subscribe(
                res => this.information = res,
                err => this.information = err
            );
        }
    }
    
}
