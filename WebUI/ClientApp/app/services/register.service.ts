import { Injectable, Component, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//Async
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
@Injectable()
export class RegisterService {
    constructor(private http: Http) { }
    registerUser(dataform: any): Observable<string> {
        var msg;
        return this.http.post('https://localhost:44342/api/Auth/RegisterUser', dataform)
            .map((response: Response) => {
               // console.log(`RESETPASSWORD RESPONSE : ${JSON.stringify(response.json().toString())} `);
                return response.json();
            }, (error: Response) => {
                return error.text();
            });
    }
    checkToken() {
        var currentUser = localStorage.getItem("currentUser");
        if (currentUser == null) {
            return true;
        }
        else {
            false;
        }

    }
}