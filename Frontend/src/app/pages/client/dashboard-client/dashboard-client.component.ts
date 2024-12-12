import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { Subscription } from 'rxjs';
import { AppointmentDataService } from '../../../services/data/appointment-data.service';
import { AuthService } from '../../../services/auth/auth-service.service';
import { RouterLink } from '@angular/router';
import { TimeslotDataService } from '../../../services/data/timeslot-data.service';
import { ProfessionalDataService } from '../../../services/data/professional-data.service';
import { of, forkJoin } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-client',
  imports: [CommonModule, MaterialModule, RouterLink],
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.css'
})
export class DashboardClientComponent {
  userId: string = '';
  appointments: any[] = [];
  professionalMap: Map<string, any> = new Map();
  timeslotMap: Map<string, any> = new Map();
  isLoading: boolean = true;
  appointmentSubscription: Subscription = new Subscription();

  constructor (
    private authService: AuthService,
    private appointmentService: AppointmentDataService,
    private timeslotService: TimeslotDataService,
    private professionalService: ProfessionalDataService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    const user = this.authService.getUser();
    this.userId = user.id;

    this.appointmentSubscription = this.appointmentService.getAll().pipe(
      map(appointments => {
        console.log('Fetched Appointments:', appointments);
        return appointments.filter(app => app.clientId === this.userId);
      }),
      tap(appointments => {
        this.appointments = appointments;
        console.log('Filtered Appointments:', appointments);
      }),
      switchMap(appointments => {
        const professionalIds = Array.from(new Set(appointments.map(app => app.professionalId)));
        const timeslotIds = Array.from(new Set(appointments.map(app => app.timeslotId)));

        return forkJoin({
          professionals: professionalIds.length
            ? forkJoin(professionalIds.map(id => this.professionalService.getById(id)))
            : of([]),
          timeslots: timeslotIds.length
            ? forkJoin(timeslotIds.map(id => this.timeslotService.getById(id)))
            : of([]),
        });
      })
    ).subscribe({
      next: ({ professionals, timeslots }) => {
        professionals.forEach(pro => {
          if (pro) this.professionalMap.set(pro.id, pro);
        });
        timeslots.forEach(slot => {
          if (slot) this.timeslotMap.set(slot.id, slot);
        });

        console.log('Professional Map:', Array.from(this.professionalMap.entries()));
        console.log('Timeslot Map:', Array.from(this.timeslotMap.entries()));
        console.log('Appointments:', this.appointments);

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load appointments or related data', err);
        this.isLoading = false;
      }
    });
  }
  

  ngOnDestroy(): void{
    if (this.appointmentSubscription) this.appointmentSubscription.unsubscribe();
  }

  cancelAppointment = (appointmentId: string) => {
    this.appointmentService.cancel(appointmentId);
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.isLoading = true;
    this.appointments = this.appointmentService.getAppointmentsByClient(this.userId);
    this.isLoading = false;
  }

}
