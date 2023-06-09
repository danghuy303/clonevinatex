import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { AuthenticationService } from './auth.service';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
        private totalRequests = 0;
        constructor(public loaderService: LoaderService, private authServices: AuthenticationService) { }
        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
                // console.log(req)
                req = req.clone({
                        setHeaders: {
                                Authorization: `Bearer ${this.authServices.currentTokenValue}`
                        }
                });
                this.loaderService.show();
                return next.handle(req).pipe(
                        finalize(() => setTimeout(() => this.loaderService.hide(), 100)),
                );
                // return next.handle(req).pipe(
                //         finalize(() => {
                //           this.totalRequests--;
                //           if (this.totalRequests === 0) {
                //             this.loaderService.hide();
                //           }
                //         })
                //       );
        }
}