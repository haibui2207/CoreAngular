import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';



import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { from } from 'rxjs/observable/from';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Injectable()
export class AuthService implements OnInit{
    public token: string;

    public isUserLoggedIn: boolean;
    //TEST
    private isBrowser: boolean;


    public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public rolesAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

<<<<<<< HEAD
    constructor(private http: Http) {
       
        //this.isUserLoggedIn = (localStorage.getItem('currentUser')) ? true : false;
    }
    ngOnInit() {
        if (localStorage.getItem('currentUser')) {
            this.isUserLoggedIn = true;
        }
        console.log("12356745678645345678");
=======
    constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
        this.isUserLoggedIn = false;
        this.isBrowser = isPlatformBrowser(platformId);
>>>>>>> 3d8d38dc3d24bc1741eeb93debac33ada635795c
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

<<<<<<< HEAD
   
=======
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
>>>>>>> 3d8d38dc3d24bc1741eeb93debac33ada635795c



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
        console.log(this.loggedIn);
        localStorage.removeItem('currentUser');
        this.rolesAdmin.next(false);
        localStorage.removeItem('role');
       
    }
}