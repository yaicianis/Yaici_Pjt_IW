export interface User {
    id: string;
    role: 'client' | 'professional';
    name: string;
    email: string;
  }
  
  export interface Timeslot {
    id: string;
    professionalId: string;
    date: string;
    time: string;
  }
  
  export interface Appointment {
    id: string;
    clientId: string;
    professionalId: string;
    timeslotId: string;
    status: 'scheduled' | 'confirmed' | 'cancelled';
  }
  