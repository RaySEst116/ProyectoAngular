import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroments';
import { Observable } from 'rxjs';

export interface Usuario {
    id: number;
    name: string;
    email: string;
    password?: string;
}

@Injectable({
    providedIn: 'root',
})
export class UsuariosService {
    private http = inject(HttpClient);

    private readonly usuariosUrl = `${environment.apiUrl}/usuarios`;

    getUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.usuariosUrl);
    }

    createUsuario(usuario: Partial<Usuario>): Observable<Usuario> {
        return this.http.post<Usuario>(this.usuariosUrl, usuario);
    }

    updateUsuario(id: number, usuario: Partial<Usuario>): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.usuariosUrl}/${id}`, usuario);
    }

    deleteUsuario(id: number): Observable<void> {
        return this.http.delete<void>(`${this.usuariosUrl}/${id}`);
    }

    checkNameExists(name: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.usuariosUrl}/exists?name=${name}`);
    }
}