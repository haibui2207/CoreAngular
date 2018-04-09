import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { AuthService } from './auth.sevice';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/userProfile';
import 'rxjs/add/operator/map'


@Injectable()
export class UserService {
    public token: string;

    constructor(private http: Http, private authService: AuthService) {
    }

    getProfile(): Observable<UserProfile> {

        let ahihi = localStorage.getItem('currentUser');

        let headers = new Headers({ 'Authorization': 'Bearer ' + ahihi });
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers });

        return this.http.get('https://localhost:44342/api/Agent/getprofile', options)
            .map((response: Response) => response.json());
    }

    getProfiles(): Observable<UserProfile[]> {

        let ahihi = localStorage.getItem('currentUser');

        let headers = new Headers({ 'Authorization': 'Bearer ' + ahihi });
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers });

        return this.http.get('https://localhost:44342/api/Agent/getagentlist', options)
            .map((response: Response) => response.json());
    }
}