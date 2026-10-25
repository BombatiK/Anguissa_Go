import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserProfile } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  // Remplacez par l'URL de votre API backend
  private apiUrl = 'http://localhost:3000/api/auth'; 

  private currentUserSubject = new BehaviorSubject<UserProfile | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  private getStoredUser(): UserProfile | null {
    const userJson = localStorage.getItem('anguissa_user');
    return userJson ? JSON.parse(userJson) : null;
  }

  login(username: string, password: string):Observable<UserProfile> {
    return this.http.post<UserProfile>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((user: UserProfile) => {
          localStorage.setItem('anguissa_user', JSON.stringify(user));
          localStorage.setItem('jwt_token', user.token);
          this.currentUserSubject.next(user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('anguissa_user');
    localStorage.removeItem('jwt_token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  getCurrentUser(): UserProfile | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}