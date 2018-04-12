import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { from } from 'rxjs/observable/from';

@Injectable()
export class AuthService {
    public token: string;

    public isUserLoggedIn: boolean;


    public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public rolesAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: Http) {
        this.isUserLoggedIn = false;
        this.isUserLoggedIn = (localStorage.getItem('currentUser')) ? true : false;
       
    }

    redirectUrl: string;


    setUserLoggedIn(check: boolean) {
        this.isUserLoggedIn = check;
    }

    setRoles(check: boolean) {
        this.isUserLoggedIn = check;
    }

    getUserLoggedIn() {
        return this.isUserLoggedIn;
    }

    getTest() {
        if (!localStorage.getItem('currentUser')) {
            return true;
        }
    }


    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }
    get isRoleAdmin() {
        return this.rolesAdmin.asObservable();
    }

    public isAuthenticated(): boolean {

        const token = localStorage.getItem('currentUser');
        if (token) {
            return true
        }
        return false;
    }

    login(email: string, password: string): Observable<boolean> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers });

        return this.http.post('https://localhost:44342/api/auth/login', JSON.stringify({ email: email, password: password }), options)
            .map((response: Response) => {

                let token = response.json().token;
                let roles = response.json().roles;
                console.log(roles);
                if (roles == "Admin")
                    this.rolesAdmin.next(true);
                if (token) {
                    this.token = token;
                    this.isUserLoggedIn = true;
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