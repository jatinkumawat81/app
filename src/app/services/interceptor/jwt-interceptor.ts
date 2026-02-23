import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../auth-service';
import { inject } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  let tokenReq = req;
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
  return next(tokenReq).pipe(
    map((event)=>{
      return event;
    }),
    catchError((error)=>{
      if(error.status === 401){
        authService.logout();
      }
      return throwError(error);
    })
  );
};
