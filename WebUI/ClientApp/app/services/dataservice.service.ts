import { Injectable } from '@angular/core';
import { ResetPasswordViewModel } from '../models/resetpasswordviewmodel';
//Async
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
//HTTPClient
import { Http, Headers , Response , RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataserviceService {
   
    private URL1 = 'https://localhost:44342/api/auth/forgotpassword';
    private URL2 = 'https://localhost:44342/api/auth/resetpassword';

    constructor(private http: Http) { }


    validateEmail(email: string): Observable<string> {
        let body = JSON.stringify({ email : email });
        let options = { headers: new Headers({ 'Content-Type': 'application/json' }) };

        return this.http.post(this.URL1, body, options)
            .map((response: Response) => {
                console.log(`FORGOTPASSWORD RESPONSE : ${JSON.stringify(response.json().toString())} `);
                return response.json().toString();
            });
    }

    requestResetPassword(model: ResetPasswordViewModel): Observable<string> {
        let body = JSON.stringify({
            email: model.email,
            password: model.password,
            confirmpassword: model.confirmpassword,
            code: model.code
        });
        let options = { headers: new Headers({ 'Content-Type': 'application/json' }) };

        return this.http.post(this.URL2, body, options)
            .map((response: Response) => {
                console.log(`RESETPASSWORD RESPONSE : ${JSON.stringify(response.json().toString())} `);
                return response.json().toString();
            });
    }
}

