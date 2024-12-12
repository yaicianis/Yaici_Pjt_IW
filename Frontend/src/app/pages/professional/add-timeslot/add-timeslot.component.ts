import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth/auth-service.service';
import { TimeslotDataService } from '../../../services/data/timeslot-data.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-timeslot',
  imports: [CommonModule, MaterialModule, RouterLink, FormsModule],
  templateUrl: './add-timeslot.component.html',
  styleUrl: './add-timeslot.component.css'
})
export class AddTimeslotComponent {
  professional: any = null;
  availabilities: any[] = [];
  isLoading: boolean = true;
  private availabilitiesSubscription: Subscription = new Subscription;


  // Champs pour le formulaire d'ajout
  newAvailability = {
    date: '',
    time: '',
  };

  constructor(
    private authService: AuthService,
    private availabilityService: TimeslotDataService
  ) {}

  ngOnInit() {
    this.professional = this.authService.getUser();
    if (this.professional && this.professional.role === 'professional') {
      this.loadAvailabilities();
    }
  }

  loadAvailabilities() {
    this.isLoading = true;
    this.availabilitiesSubscription = this.availabilityService.getAll().subscribe((availabilities: any[]) => {
      this.availabilities = availabilities.filter(
        availability => availability.professionalId === this.professional.id
      );
      this.availabilities = [...this.availabilities]; // Initialisation avec toutes les disponibilités
      this.isLoading = false;
    });
    // Initial fetch
    this.availabilityService.getTimeslotsByProfessional(this.professional.id);
  }
  
  ngOnDestroy() {
    if (this.availabilitiesSubscription) {
      this.availabilitiesSubscription.unsubscribe();
    }
  }

  addAvailability() {
    if (this.newAvailability.date && this.newAvailability.time) {
      this.availabilityService.save({
        date: this.newAvailability.date,
        time: this.newAvailability.time,
        professionalId: this.professional.id,
      });
      this.loadAvailabilities();
      this.newAvailability = { date: '', time: '' }; // Réinitialiser le formulaire
    }
  }

  deleteAvailability(id: string) {
    this.availabilityService.delete(id);
    this.loadAvailabilities();
  }

  updateAvailability(id: string, date: string, time: string) {
    this.availabilityService.update(id, { date, time });
    this.loadAvailabilities();
  }
}
