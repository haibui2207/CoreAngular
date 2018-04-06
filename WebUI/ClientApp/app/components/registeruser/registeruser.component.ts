import { Component, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'registeruser',
    templateUrl: './registeruser.component.html'
})
export class RegisterUserComponent {
    sMsg: any;
    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string) {
    }
    onClickSubmit(dataform: any) {
        this.http.post('https://localhost:44342/api/Auth/RegisterUser', dataform).subscribe(result => {
            this.sMsg = result.json()
        }, (error: Response) => {
            this.sMsg = error.text();
        });
      
        //this.http.post('https://localhost:44342/api/Auth/RegisterUser', dataform)
        //    .map((res: Response) => {
        //        this.sMsg = res;
        //        console.log(this.sMsg);
        //    });
    }
}