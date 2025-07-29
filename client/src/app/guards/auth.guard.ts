import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);

  return http.get('http://localhost:5000/api/check-auth', { withCredentials: true }).pipe(
    map((res: any) => {
      if (res.isAuthenticated) return true;
      return router.createUrlTree(['/login']); // ✅ Don't use .navigate inside guard
    }),
    catchError(() => {
      return of(router.createUrlTree(['/login']));
    })
  );
};
