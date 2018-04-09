import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { from } from 'rxjs/observable/from';

@Injectable()
export class AuthService {
    public token: string;

    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(private http: Http) {
        this.loggedIn.next(false);
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }


    login(email: string, password: string): Observable<boolean> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers });

        return this.http.post('https://localhost:44342/api/auth/login', JSON.stringify({ email: email, password: password }), options)
            .map((response: Response) => {

                let token = response.json().token;
                if (token) {
                    this.token = token;
                    localStorage.setItem('currentUser', token);
                    this.loggedIn.next(true);
                    return true;
                } else {
                    return false;
                }
            }).catch((error: any) => {
                return Observable.of(false);
            });
    }

    logout(): void {
        this.token = "";
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser');
       
    }
}