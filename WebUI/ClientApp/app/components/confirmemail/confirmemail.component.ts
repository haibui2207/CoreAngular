import { Router, ActivatedRoute, Params } from '@angular/router';
import { OnInit, Component } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
@Component({
    selector: 'confirmEmail',
    templateUrl: './confirmemail.component.html'
})
export class confirmEmailComponent {
    sMsg: any;
    constructor(private route: ActivatedRoute, private http: Http) {
        
    }
    ngOnInit() {
        // get param:http://localhost:53750/confirmEmail?param1=value&code=a
        let userid = this.route.snapshot.queryParams["id"];
        let code = this.route.snapshot.queryParams["code"];
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers });

        this.http.post('https://localhost:44342/api/auth/confirmEmail', JSON.stringify({ userid: userid, code: code }), options).subscribe(result => {
            this.sMsg = result.text();
        }, (error: Response) => {
            if (error.status != 0)
                this.sMsg = error.text();
        });
    }
}
