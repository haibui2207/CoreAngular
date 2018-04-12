import { Component , OnInit} from '@angular/core';
import { DataserviceService } from '../../services/dataservice.service';
import { ForgotPasswordViewModel } from '../../models/forgotpasswordviewmodel';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
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

    constructor(private dataService: DataserviceService, private myservice: RegisterService, private router: Router) { }

    ngOnInit() { }

    validateEmail() {
        if (this.myservice.checkToken()) {
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
        else {
            this.router.navigate(['/home']);
        }
       
    }
    
}
