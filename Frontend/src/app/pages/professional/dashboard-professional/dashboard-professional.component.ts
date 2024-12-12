import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppointmentDataService } from '../../../services/data/appointment-data.service';
import { AuthService } from '../../../services/auth/auth-service.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-professional',
  imports: [CommonModule, MaterialModule, RouterLink],
  templateUrl: './dashboard-professional.component.html',
  styleUrl: './dashboard-professional.component.css'
})
export class DashboardProfessionalComponent {
  professionalId: string = '';
  appointments: any[] = [];
  isLoading: boolean = true;
  professional: any;
  appointmentsSubscription: Subscription = new Subscription; 

  constructor(
    private appointmentService: AppointmentDataService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    
    this.professional = this.authService.getUser();
    this.professionalId = this.professional.id;
    
    this.appointmentsSubscription = this.appointmentService.getAll().subscribe(appointments => {
      this.appointments = appointments.filter(
        appointment => appointment.professionalId === this.professionalId
      );
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    
    if (this.appointmentsSubscription) {
      this.appointmentsSubscription.unsubscribe();
    }
  }

 
  confirmAppointment(id: string) {
    const updatedAppointment = this.appointmentService.update(id, { status: 'Confirmé' });
    alert('Rendez-vous confirmé !');
    
  }

  
  cancelAppointment(id: string) {
    const updatedAppointment = this.appointmentService.update(id, { status: 'Annulé' });
    alert('Rendez-vous annulé.');
  }
}
