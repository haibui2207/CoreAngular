import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';



import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { from } from 'rxjs/observable/from';

@Injectable()
export class AuthService {
    public token: string;

    public isUserLoggedIn: boolean;
    //TEST
    private isBrowser: boolean;


    public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public rolesAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
        this.isUserLoggedIn = false;
        this.isBrowser = isPlatformBrowser(platformId);
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

    //TEST
    getCurrentUser() {
        if (this.isBrowser) {
            if (window.localStorage.getItem('currentUser') == null) {
                return false;
            }
            return true;
        }         
        return false;
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
                if (roles == "Admin") {
                    window.localStorage.setItem('role', roles);
                    this.rolesAdmin.next(true);
                }
                if (token) {
                    this.token = token;
                    this.isUserLoggedIn = true;
                    window.localStorage.setItem('currentUser', token);
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
        this.rolesAdmin.next(false);
        localStorage.removeItem('role');
       
    }
}