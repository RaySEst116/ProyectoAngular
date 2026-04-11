import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { enviroment } from '../../enviroment/enviroment';

export interface SessionUser {
  id: number,
  name: string,
  email: string
}

interface LoginResponse {
  token: string
  message: string
  user: SessionUser
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private http = inject(HttpClient)

  private readonly storageKey = 'session_user'
  private readonly storageKeyToken = 'session_toekn'
  private readonly loginUrl = `${enviroment.apiUrl}/auth/login`
  private readonly registerUrl = `${enviroment.apiUrl}/auth/register`
  private readonly userUrl = `${enviroment.apiUrl}/auth/users`

  private readonly _currentUser = signal<SessionUser | null>(this.readFromStorage())

  readonly currentUser = computed(() => this._currentUser())
  readonly isAuthenticated = computed(() => this._currentUser() !== null)

  login(email: string, password: string): Observable<SessionUser> {
    return this.http.post<LoginResponse>(this.loginUrl, { email, password }).pipe (
      tap((response: LoginResponse) => {
        localStorage.setItem(this.storageKey, JSON.stringify(response.user))
        localStorage.setItem(this.storageKeyToken, response.token)
        this._currentUser.set(response.user)
        console.log(response.user)
      }),
      map((response: LoginResponse) => response.user)
    )
  }

  register(user: Partial<SessionUser> & { password?: string }): Observable<SessionUser> {
    return this.http.post<LoginResponse>(this.registerUrl, user).pipe (
      tap((response: LoginResponse) => {
        if (response.token && response.user) {
          localStorage.setItem(this.storageKey, JSON.stringify(response.user))
          localStorage.setItem(this.storageKeyToken, response.token)
          this._currentUser.set(response.user)
        }
      }),
      map((response: LoginResponse) => response.user)
    )
  }

  getUsers(): Observable<SessionUser[]> {
    return this.http.get<SessionUser[]>(this.userUrl)
  }

  updateUser(id: number, user: Partial<SessionUser> & { password?: string }): Observable<SessionUser> {
    return this.http.put<SessionUser>(`${this.userUrl}/${id}`, user)
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.userUrl}/${id}`)
  }

  readFromStorage(){
    const user = localStorage.getItem(this.storageKey)
    if(!user) return null
    try {
      return JSON.parse(user) as SessionUser
    } catch (error) {
      localStorage.removeItem(this.storageKey)
      return null
    }
  }

  logout(): void {
    this._currentUser.set(null)
    localStorage.removeItem(this.storageKey)
  }
}
