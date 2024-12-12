import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeslotDataService {

  private timeslots = [
    { id: '1', date: '2024-12-05', time: '09:00', professionalId: '1' },
    { id: '2', date: '2024-12-13', time: '15:00', professionalId: '2' },
    { id: '3', date: '2024-12-31', time: '16:00', professionalId: '2' },
  ]

  private timeslotSubject = new BehaviorSubject<any[]>(this.timeslots);

  constructor() { }

  getAll = () => {return this.timeslotSubject.asObservable()};
  getById = (id: string) => {
    const timeslot = this.timeslots.find(timeslot => timeslot.id === id);
    return of(timeslot);
  };
  save = (addedTimeslot: any) => {
    const exists = this.timeslots.some(timeslot => timeslot.id === addedTimeslot.id);
    if (exists) {
      throw new Error(`Timeslot ${addedTimeslot.id} already exists!`);
    }
    
    this.timeslots.push(addedTimeslot);
    this.timeslotSubject.next([...this.timeslots]);
    return addedTimeslot;
  }

  update = (id:string, updateTimeslot: any) => {
    const idx = this.timeslots.findIndex(timeslot => timeslot.id === id);
    if (idx === -1) {
      throw new Error(`Timeslot ${id} doesn't exist!`);
    }
    
    this.timeslots[idx] = { ...this.timeslots[idx], ...updateTimeslot};
    this.timeslotSubject.next([...this.timeslots]);
    return this.timeslots[idx];
  }

  delete = (id:string) => {
    const idx = this.timeslots.findIndex(timeslot => timeslot.id === id);
    if (idx === -1) {
      throw new Error(`Timeslot ${id} doesn't exist!`);
    }
    
    const [deletedTimeslot] = this.timeslots.splice(idx, 1);
    this.timeslotSubject.next([...this.timeslots]);
    return deletedTimeslot;
  }

  getTimeslotsByProfessional = (professionalId: string) => {
    return this.timeslots.filter(timeslot => timeslot.professionalId === professionalId)
  }
  
  getTimeslotsByDate = (date: string) => {
    return this.timeslots.filter(timeslot => timeslot.date === date)
  }
}
