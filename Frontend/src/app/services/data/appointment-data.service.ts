import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentDataService {

  private appointments = [
    { id: '1', timeslotId: '1', clientId: '1', professionalId: '1', status: "confirmed"},
    { id: '2', timeslotId: '2', clientId: '2', professionalId: '1', status: 'scheduled' },
    { id: '3', timeslotId: '3', clientId: '1', professionalId: '2', status: 'cancelled' }
  ]

  private appointmentSubject = new BehaviorSubject<any[]>(this.appointments);

  constructor() { }

  getAll = () => {return this.appointmentSubject.asObservable()};
  getById = (id: string) => {return this.appointments.find(appointment => appointment.id === id)};
  save = (addedAppointment: any) => {
    const exists = this.appointments.some(appointment => appointment.id === addedAppointment.id);
    if (exists) {
      throw new Error(`Appointment ${addedAppointment.id} already exists!`);
    }
    
    this.appointments.push(addedAppointment);
    this.appointmentSubject.next([...this.appointments]);
    return addedAppointment;
  }

  update = (id:string, updateAppointment: any) => {
    const idx = this.appointments.findIndex(appointment => appointment.id === id);
    if (idx === -1) {
      throw new Error(`Appointment ${id} doesn't exist!`);
    }
    
    this.appointments[idx] = { ...this.appointments[idx], ...updateAppointment};
    this.appointmentSubject.next([...this.appointments]);
    return this.appointments[idx];
  }

  cancel = (id:string) => {
    const idx = this.appointments.findIndex(appointment => appointment.id === id);
    if (idx === -1) {
      throw new Error(`Appointment ${id} doesn't exist!`);
    }
    
    this.appointments[idx].status = 'cancelled';
    this.appointmentSubject.next([...this.appointments]);
  }

  book = (id:string) => {
    const idx = this.appointments.findIndex(appointment => appointment.id === id);
    if (idx === -1) {
      throw new Error(`Appointment ${id} doesn't exist!`);
    }
    
    if(this.appointments[idx].status === "scheduled") {
      this.appointments[idx].status = "confirmed";
      this.appointmentSubject.next([...this.appointments]);
    }
  }

  getAppointmentsByProfessional = (professionalId: string) => {
    return this.appointments.filter(appointment => appointment.professionalId === professionalId)
  }
  
  getAppointmentsByClient = (clientId: string) => {
    return this.appointments.filter(appointment => appointment.clientId === clientId)
  }

  getAppointmentsByTimeslot = (timeslotId: string) => {
    return this.appointments.filter(appointment => appointment.timeslotId === timeslotId)
  }
}
