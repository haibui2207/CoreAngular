import { Component , OnInit} from '@angular/core';
import { DataserviceService } from '../../services/dataservice.service';
import { ForgotPasswordViewModel } from '../../models/forgotpasswordviewmodel';

@Component({
    selector: 'forgotpassword',
    templateUrl: './forgotpassword.component.html',
    styleUrls: ['./forgotpassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    successMessage: string;
    errorMessage: string;
    disableButton: string;
    forgotPasswordModel: ForgotPasswordViewModel = new ForgotPasswordViewModel();

    constructor(private dataService: DataserviceService) { }

    ngOnInit() { }

    validateEmail() {
        this.dataService.validateEmail(this.forgotPasswordModel.email)
            .subscribe(
            res => {
                this.disableButton = "disabled";
                this.successMessage = res;
            },
            err => {
                this.forgotPasswordModel.email = "";
                console.log(`err : ${JSON.stringify(err)}`);
                this.errorMessage = err.text();
            });
    }
    
}
