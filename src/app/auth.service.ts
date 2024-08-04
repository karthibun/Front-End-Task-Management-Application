import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webService: WebRequestService, private router: Router, private http: HttpClient) { }

  login(email: string, password: string): Observable<void> {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        const userId = res.body?._id;
        const accessToken = res.headers.get('x-access-token');
        const refreshToken = res.headers.get('x-refresh-token');

        if (userId && accessToken && refreshToken) {
          this.setSession(userId, accessToken, refreshToken);
          console.log("LOGGED IN!");
        } else {
          console.error("Login failed: Missing authentication tokens.");
        }
      }),
      map(() => undefined) // Ensure return type is Observable<void>
    );
  }

  signup(email: string, password: string): Observable<void> {
    return this.webService.signup(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        const userId = res.body?._id;
        const accessToken = res.headers.get('x-access-token');
        const refreshToken = res.headers.get('x-refresh-token');

        if (userId && accessToken && refreshToken) {
          this.setSession(userId, accessToken, refreshToken);
          console.log("Successfully signed up and now logged in!");
        } else {
          console.error("Signup failed: Missing authentication tokens.");
        }
      }),
      map(() => undefined) // Ensure return type is Observable<void>
    );
  }

  logout(): void {
    this.removeSession();
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('x-access-token') : null;
  }

  getRefreshToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('x-refresh-token') : null;
  }

  getUserId(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('user-id') : null;
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  getNewAccessToken(): Observable<void> {
    return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken() || '',
        '_id': this.getUserId() || ''
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        const accessToken = res.headers.get('x-access-token');
        if (accessToken) {
          this.setAccessToken(accessToken);
        } else {
          console.error("Failed to refresh access token.");
        }
      }),
      map(() => undefined) // Ensure return type is Observable<void>
    );
  }
}
