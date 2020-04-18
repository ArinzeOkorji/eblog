import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()

export class AddHeader implements HttpInterceptor {
  constructor(public authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqMethod = req.method;
    const reqArray = req.url.split('/');

    // return next.handle(req);

    if (reqMethod === 'GET') {
      if (reqArray[reqArray.length - 1] === 'feed' || 'user') {
        const token = this.authService.userJWT;
        const reqWithHeader = req.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Authorization: `${token}`
          }
        });
        return next.handle(reqWithHeader);
      } else {
        const reqWithHeader = req.clone({
          setHeaders: {
            'Content-Type': 'application/json'
          }
        });
        return next.handle(reqWithHeader);
      }
    } else if (reqMethod === 'Post') {
      if (reqArray[reqArray.length - 1] === 'login' || 'users') {
          const reqWithHeader = req.clone({
            setHeaders: {
              'Content-Type': 'application/json'
            }
          });
          return next.handle(reqWithHeader);
      } else {
        const token = this.authService.userJWT;
        const reqWithHeader = req.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Authorization: `${token}`
          }
        });
        return next.handle(reqWithHeader);
      }
    } else {
      const token = this.authService.userJWT;
      const reqWithHeader = req.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Authorization: `${token}`
          }
        });
      return next.handle(reqWithHeader);
    }
  }
}
