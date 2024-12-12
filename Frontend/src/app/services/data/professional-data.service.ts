import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalDataService {

  private professionals = [
    { id: '1', name: 'Liam', email: 'pro1@example.com', password: '56liam', role: 'professional' },
    { id: '2', name: 'Mia', email: 'pro2@example.com', password: '23mia', role: 'professional' }
  ]

  private professionalSubject = new BehaviorSubject<any[]>(this.professionals);

  constructor() { }

  getAll = () => {return this.professionalSubject.asObservable()};
  getById = (id: string) => {
    const professional = this.professionals.find(prof => prof.id === id);
    return of(professional);
  };
  save = (addedProfessional: any) => {
    const exists = this.professionals.some(professional => professional.id === addedProfessional.id);
    if (exists) {
      throw new Error(`Professional ${addedProfessional.id} already exists!`);
    }
    
    this.professionals.push(addedProfessional);
    this.professionalSubject.next([...this.professionals]);
    return addedProfessional;
  }

  update = (id:string, updateProfessional: any) => {
    const idx = this.professionals.findIndex(professional => professional.id === id);
    if (idx === -1) {
      throw new Error(`Professional ${id} doesn't exist!`);
    }
    
    this.professionals[idx] = { ...this.professionals[idx], ...updateProfessional};
    this.professionalSubject.next([...this.professionals]);
    return this.professionals[idx];
  }

  delete = (id:string) => {
    const idx = this.professionals.findIndex(professional => professional.id === id);
    if (idx === -1) {
      throw new Error(`Professional ${id} doesn't exist!`);
    }
    
    const [deletedProfessional] = this.professionals.splice(idx, 1);
    this.professionalSubject.next([...this.professionals]);
    return deletedProfessional;
  }

  getByEmailAndPassword = (email: string, password: string) => {
    return this.professionals.find(professional => professional.email === email && professional.password === password)
  }
  
}
