import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoginService } from './login.service';
import { SnackbarService } from '../misc/snackbar.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private service: LoginService, public snackBar: SnackbarService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authKey = localStorage.getItem('token');
        if (authKey) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${authKey}`
                }
            });
        }

        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
              let errorMsg = '';
              if (err.error instanceof ErrorEvent) {
                console.log('this is client side error');
                errorMsg = `Error: ${err.error.message}`;
              }
              else {
                console.log('this is server side error');
                if(err.status == 404){
                    const errors = err.error;
                    this.snackBar.error(errors.message);
                }else{
                  this.snackBar.error("something wrong");
                }
                // errorMsg = `Error Code: ${err.status},  Message: ${err.message}`;
            //   console.log(err);
            }
            //   console.log(errorMsg);
              return throwError(errorMsg);
            })
          );

    }
}
