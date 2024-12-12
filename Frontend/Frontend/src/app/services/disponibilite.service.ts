import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TimeSlot {
  id?: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DisponibiliteService {
  private apiUrl = 'http://localhost:8082/timeslots'; // URL du backend Spring Boot

  constructor(private http: HttpClient) {}

  // Obtenir toutes les disponibilités
  getAllTimeSlots(): Observable<TimeSlot[]> {
    return this.http.get<TimeSlot[]>(this.apiUrl);
  }

  // Ajouter une nouvelle disponibilité
  addTimeSlot(timeSlot: TimeSlot): Observable<TimeSlot> {
    return this.http.post<TimeSlot>(`${this.apiUrl}/save`, timeSlot);
  }

  // Supprimer une disponibilité
  deleteTimeSlot(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une disponibilité
  updateTimeSlot(id: number, timeSlot: TimeSlot): Observable<TimeSlot> {
    return this.http.put<TimeSlot>(`${this.apiUrl}/${id}`, timeSlot);
  }
}
