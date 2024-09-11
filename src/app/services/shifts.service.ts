import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ShiftDto } from '../interfaces/shift.interface';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {
  private baseUrl = `${environment.apiUrl}/Shifts`;

  constructor(private http: HttpClient) { }

  // Método para obtener turnos sin usuario asignado y no expirados
  getAvailableShifts(): Observable<ShiftDto[]> {
    return this.http.get<ShiftDto[]>(`${this.baseUrl}/AvailableShifts`);
  }

  // Método para obtener turnos por IdUser
  getShiftsByUser(idUser: number): Observable<ShiftDto[]> {
    return this.http.get<ShiftDto[]>(`${this.baseUrl}/GetShiftsByUser/${idUser}`);
  }

  // Método para obtener un turno específico por IdShift
  getShiftById(idShift: number): Observable<ShiftDto> {
    return this.http.get<ShiftDto>(`${this.baseUrl}/GetShiftsById/${idShift}`);
  }

  // Método para crear un nuevo turno
  createShift(idBranch: number, scheduledDateTime: Date): Observable<ShiftDto> {
    return this.http.post<ShiftDto>(`${this.baseUrl}/CreateShift`, {
      IdBranch: idBranch,
      ScheduledDateTime: scheduledDateTime
    });
  }

  // Método para actualizar un turno existente
  updateShift(shift: ShiftDto): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/UpdateShift`, shift);
  }

  // Método para asignar un usuario a un turno
  assignUserToShift(idShift: number, idUser: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Assign/${idShift}/${idUser}`, {});
  }
  
}
