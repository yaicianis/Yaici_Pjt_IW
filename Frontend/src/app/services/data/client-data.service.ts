import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {

  private clients = [
    { id: '1', name: 'John', email: 'client1@example.com', password: '45john', role: 'client' },
    { id: '2', name: 'Eve', email: 'client2@example.com', password: '92eve', role: 'client' }
  ]

  private clientSubject = new BehaviorSubject<any[]>(this.clients);

  constructor() { }

  getAll = () => {return this.clientSubject.asObservable()};
  getById = (id: string) => {return this.clients.find(client => client.id === id)};
  save = (addedClient: any) => {
    const exists = this.clients.some(client => client.id === addedClient.id);
    if (exists) {
      throw new Error(`Client ${addedClient.id} already exists!`);
    }
    
    this.clients.push(addedClient);
    this.clientSubject.next([...this.clients]);
    return addedClient;
  }

  update = (id:string, updateClient: any) => {
    const idx = this.clients.findIndex(client => client.id === id);
    if (idx === -1) {
      throw new Error(`Client ${id} doesn't exist!`);
    }
    
    this.clients[idx] = { ...this.clients[idx], ...updateClient};
    this.clientSubject.next([...this.clients]);
    return this.clients[idx];
  }

  delete = (id:string) => {
    const idx = this.clients.findIndex(client => client.id === id);
    if (idx === -1) {
      throw new Error(`Client ${id} doesn't exist!`);
    }
    
    const [deletedClient] = this.clients.splice(idx, 1);
    this.clientSubject.next([...this.clients]);
    return deletedClient;
  }

  getByEmailAndPassword(email: string, password: string) {
    return this.clients.find(client => client.email === email && client.password === password);
  }
  
}
