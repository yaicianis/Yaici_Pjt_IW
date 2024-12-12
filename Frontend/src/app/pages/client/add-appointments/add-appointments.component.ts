import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth/auth-service.service';
import { TimeslotDataService } from '../../../services/data/timeslot-data.service';
import { AppointmentDataService } from '../../../services/data/appointment-data.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { RouterLink } from '@angular/router';
import { ProfessionalDataService } from '../../../services/data/professional-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-appointments',
  imports: [CommonModule, MaterialModule, RouterLink, FormsModule],
  templateUrl: './add-appointments.component.html',
  styleUrl: './add-appointments.component.css'
})
export class AddAppointmentsComponent {
  clientId: string = '';
  client: any;
  timeslots: any[] = [];
  selectedTimeslot: any = null;
  appointments: any[] = [];
  type: string = "";
  error: string = "";
  numCard: string = "";
  typeInputted: boolean = false;
  appointmentsSubscription: Subscription = new Subscription();
  timeslotsSubscription: Subscription = new Subscription();
  professionalSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private timeslotService: TimeslotDataService,
    private professionalService: ProfessionalDataService,
    private appointmentService: AppointmentDataService
  ) {}

  ngOnInit(): void{
    this.client = this.authService.getUser();
    this.clientId = this.client.id;
  
    this.appointmentsSubscription = this.appointmentService.getAll().subscribe(appointments => {
      this.appointments = appointments.filter(
        appointment => appointment.clientId === this.clientId
      );
    });

    this.timeslotsSubscription = this.timeslotService.getAll().subscribe(timeslots => {
      this.timeslots = timeslots;
      console.log('Disponibilités chargées : ', this.timeslots);
    });
  }

  ngOnDestroy(): void {
    if (this.appointmentsSubscription) {
      this.appointmentsSubscription.unsubscribe();
    }
  }

  checkType(): boolean {
    if (this.type) {
      if (!(this.type === "ordinaire" || this.type === "primiere-fois" || this.type === "urgent")) {
        this.error = "Ordinaire, Premiere fois, Urgent";
        return false;
      }
      else return true;
    }
    return false;
  }
    
  createAppointment() {
    if (this.selectedTimeslot) {

      const newAppointment = {
        id: (Math.random() * 1000).toString(),
        timeslotId: this.selectedTimeslot.id,
        status: 'En attente',
        type: this.type,
        numCard: this.numCard,
        professionalId: this.selectedTimeslot.professionalId,
        clientId: this.clientId,
      };
  
      console.log('Nouvel rendez-vous : ', newAppointment);
  
      try {
        this.appointmentService.save(newAppointment);
        alert('Rendez-vous réservé avec succès!');
        this.selectedTimeslot = null;
      } catch (error) {
        console.error('Erreur lors de la création du rendez-vous : ', error);
      }
    } else {
      alert('Veuillez sélectionner une disponibilité.');
    }
  }
}
