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

    editProfile(userName: string, fileUpload: File): Observable<boolean> {

        let ahihi = localStorage.getItem('currentUser');

        const headers = new Headers();
        headers.append('Accept', 'multipart/form-data');
        headers.append('Authorization', 'Bearer ' + ahihi);
        const options = new RequestOptions({ headers: headers });

        let formData = new FormData();
        formData.append('file', fileUpload, fileUpload.name);
        formData.append('userName', userName);
        return this.http.post('https://localhost:44342/api/Agent/editprofile', formData, options)
            .map((response: Response) => {
                return true;
            });
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