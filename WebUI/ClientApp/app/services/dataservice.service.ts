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
    private URL2 = 'https://localhost:44342/api/auth/getcoderesetpassword';
    private URL3 = 'https://localhost:44342/api/auth/resetpassword';

    constructor(private http: Http) { }


    validateEmail(email: string): Observable<string> {
        let body = JSON.stringify({ email : email });
        let options = { headers: new Headers({ 'Content-Type': 'application/json' }) };

        return this.http.post(this.URL1, body, options)            
            .map(
                (response: Response) => {
                    console.log(`FORGOTPASSWORD RESPONSE : ${JSON.stringify(response.json().toString())}`);
                    return response.json().toString();                
                },
                (error: Response) => {
                    return error.text();
            });            
    }

    requestCodeResetPassword(userid: string): Observable<ResetPasswordViewModel> {
        let body = JSON.stringify(userid);
        console.log(`body: ${body} `);
        let options = { headers: new Headers({ 'Content-Type': 'application/json' }) };
        let model = new ResetPasswordViewModel();

        return this.http.post(this.URL2, body, options)
            .map(
            (response: Response) => {
                model.code = response.json().code;
                model.email = response.json().email;
                return model;
            },
            (error: Response) => {               
                return error.text();
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

        return this.http.post(this.URL3, body, options)
            .map(
                (response: Response) => {
                    console.log(`RESETPASSWORD RESPONSE : ${JSON.stringify(response.json().toString())} `);
                    return response.json().toString();
                },
                (error: Response) => {
                    //console.log(`RESETPASSWORD RESPONSE ERROR: ${JSON.stringify(error.json().toString())} `);
                    return error.text();
                }
            );
    }
}

