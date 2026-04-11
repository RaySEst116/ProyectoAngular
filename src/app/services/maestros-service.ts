import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroments';
import { Observable } from 'rxjs';

export interface Maestro {
    id: number;
    nombre: string;
    apellido: string;
    numeroEmpleado: string;
    departamento: string;
    especialidad: string;
    correo: string;
}

@Injectable({
    providedIn: 'root',
})
export class MaestrosService {
    private http = inject(HttpClient);

    private readonly maestrosUrl = `${environment.apiUrl}/maestros`;

    getMaestros(): Observable<Maestro[]> {
        return this.http.get<Maestro[]>(this.maestrosUrl);
    }

    createMaestro(maestro: Partial<Maestro>): Observable<Maestro> {
        return this.http.post<Maestro>(this.maestrosUrl, maestro);
    }

    updateMaestro(id: number, maestro: Partial<Maestro>): Observable<Maestro> {
        return this.http.put<Maestro>(`${this.maestrosUrl}/${id}`, maestro);
    }

    deleteMaestro(id: number): Observable<void> {
        return this.http.delete<void>(`${this.maestrosUrl}/${id}`);
    }
}