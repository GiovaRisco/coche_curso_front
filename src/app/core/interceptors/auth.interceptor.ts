import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Estoy en el interceptor")
    let headers;

    let token = this.tokenService.getToken();

    if (!token) {
      return next.handle(request);
    }

    console.log("Este es el token" + token)

    headers = {
      'Authorization': 'Bearer '+token
    }

    let authRequest = request.clone({
      setHeaders: {
        ...headers
      },
    });

    console.log(authRequest)
    return next.handle(authRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No tienes permisos para acceder a ésta página.'
          })
        }
        return throwError(() => err);
      })
    );
  }
}
