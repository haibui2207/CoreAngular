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
    infomation:string;
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
                        this.infomation = "";
                    },
                    err => {
                        this.infomation = "Error try again"
                    }
                );
        }
        else {
            this.dataService.requestResetPassword(this.resetPasswordModel).subscribe(
                res => {
                    this.infomation = res;
                },
                err => {
                    this.infomation = "Error try again"
                }
            );
        }
    }
    
}
