import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Rend le service accessible partout
})
export class UserService {
  private apiUrl = 'http://localhost:8081/users'; // URL de votre backend Spring Boot

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer un utilisateur par email
  findUserByEmail(email: string): Observable<any[]> {
    const url = `${this.apiUrl}/findByEmail?email=${email}`;
    return this.http.get<any[]>(url);
  }

  // Méthode pour créer un utilisateur
  createUser(user: any): Observable<any> {
    const url = `${this.apiUrl}/save`;
    return this.http.post<any>(url, user);
  }
}
