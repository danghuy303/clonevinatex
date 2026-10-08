import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { AuthenticationService } from './auth.service';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
        private totalRequests = 0;
        constructor(public loaderService: LoaderService, private authServices: AuthenticationService) { }
        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
                // console.log(req)
                const token = this.authServices.currentTokenValue;
                if (token) {
                        req = req.clone({
                                setHeaders: {
                                        Authorization: `Bearer ${token}`
                                }
                        });
                }
                this.loaderService.show();
                return next.handle(req).pipe(
                        tap((event: HttpEvent<any>) => {
                                if (event instanceof HttpResponse) {
                                        const body = event.body;
                                        if (body && (body.sError === 'ChuaDangNhap' || body.Error === 'ChuaDangNhap')) {
                                                this.authServices.logout();
                                        }
                                }
                        }),
                        catchError((error: HttpErrorResponse) => {
                                if (error.status === 401) {
                                        this.authServices.logout();
                                }
                                return throwError(error);
                        }),
                        finalize(() => setTimeout(() => this.loaderService.hide(), 100)),
                );
        }
}