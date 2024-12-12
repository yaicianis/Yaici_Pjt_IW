import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RendezvousService {
  private baseUrl = 'http://localhost:8086'; 

  constructor(private http: HttpClient) {}

  // Récupérer tous les rendez-vous
  getAllRendezvous(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/appointments/rendezvous`);
  }

  // Filtrer les rendez-vous par statut
  getRendezvousByStatus(status: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/yaici/status/${status}`);
  }

  // Filtrer les rendez-vous par date
  getRendezvousByDate(date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/yaici/date/${date}`);
  }

  // Créer un nouveau rendez-vous
  createRendezvous(rendezvous: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/appointments/save`, rendezvous);
  }

  // Mettre à jour un rendez-vous
  updateRendezvous(id: number, rendezvous: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/appointments/${id}`, rendezvous);
  }

  // Supprimer un rendez-vous
  deleteRendezvous(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/appointments/${id}`);
  }
}
