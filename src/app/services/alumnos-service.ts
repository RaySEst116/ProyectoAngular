import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroments';
import { Observable } from 'rxjs';

export interface Alumno {
    id: number;
    nombre: string;
    apellido: string;
    matricula: string;
    carrera: string;
    cuatrimestre: number;
    correo: string;
}

@Injectable({
    providedIn: 'root',
})
export class AlumnosService {
    private http = inject(HttpClient);

    private readonly alumnosUrl = `${environment.apiUrl}/alumnos`;

    getAlumnos(): Observable<Alumno[]> {
        return this.http.get<Alumno[]>(this.alumnosUrl);
    }

    createAlumno(alumno: Partial<Alumno>): Observable<Alumno> {
        return this.http.post<Alumno>(this.alumnosUrl, alumno);
    }

    updateAlumno(id: number, alumno: Partial<Alumno>): Observable<Alumno> {
        return this.http.put<Alumno>(`${this.alumnosUrl}/${id}`, alumno);
    }

    deleteAlumno(id: number): Observable<void> {
        return this.http.delete<void>(`${this.alumnosUrl}/${id}`);
    }

    getResumenIA(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/ia/resumen/${id}`);
    }
}
