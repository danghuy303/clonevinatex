import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API, httpOptions } from './host';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class


    AuthenticationService {
    loginurl = API.auth + 'QuanTri/Login_Winform';
    loginJWTurl = API.auth + 'oauth2/token';

    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    private currentAccess_Token: BehaviorSubject<any>;

    constructor(private http: HttpClient, private router: Router) {
        const currentUserData = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<any>(currentUserData ? JSON.parse(currentUserData) : null);
        this.currentAccess_Token = new BehaviorSubject<any>(localStorage.getItem('access_token'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }
    public get currentTokenValue(): any {
        return this.currentAccess_Token.value;
    }
    public isTokenValid(): boolean {
        const token = localStorage.getItem('access_token');
        if (!token) return false;
        
        try {
            // Giải mã JWT token để kiểm tra thời hạn (nếu cần)
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp > currentTime;
        } catch (error) {
            return false;
        }
    }
    public GetCurrentUser() {
        const url = API.auth + 'QuanTri/GetCurrentUser';
        return this.http.get(url, httpOptions).pipe(map(res => {
            localStorage.setItem('currentUser', JSON.stringify(res));
            this.currentUserSubject.next(res);
            return res;
        }));
    }
    login(data) {
        // return this.http.post(this.loginurl, data, httpOptions).pipe(map((user: any) => {
        //     if (user !== false) {
        //         if (user.Error === 4) {
        //             // console.log(user);
        //             // console.log(data);
        //             if(data.RememberMe){
        //                 localStorage.setItem('loginData', JSON.stringify(data));
        //             }
        //             localStorage.setItem('currentUser', JSON.stringify(user.Value));
        //             this.currentUserSubject.next(user.Value);
        //         }
        //     }
        //     return user;
        // }));
        return this.http.post(this.loginJWTurl, `username=${data.UserName}&password=${data.Password}&grant_type=password&tokenfirebase=a`, httpOptions).pipe(map((user: any) => {
            if (user.access_token) {
                // if (user.Error === 4) {
                this.currentAccess_Token.next(user.access_token);
                localStorage.setItem('access_token', user.access_token);
                if (data.RememberMe) {
                    localStorage.setItem('loginData', JSON.stringify(data));
                }
                this.currentUserSubject.next(user.Value);
                this.GetCurrentUser();
                // }
            }
            return user;
        }));
    }
    public logout() {
        // this.services.LogOut().subscribe((res: any) => {
        // });
        (window as any).autoLogin = false;
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        localStorage.removeItem('access_token');
        this.currentAccess_Token.next(null);
        this.router.navigate(['/login']);
        return true;
    }
}