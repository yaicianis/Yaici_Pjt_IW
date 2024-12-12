import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth/auth-service.service';
import { TimeslotDataService } from '../../../services/data/timeslot-data.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timeslots',
  imports: [CommonModule, MaterialModule, RouterLink, FormsModule],
  templateUrl: './timeslots.component.html',
  styleUrl: './timeslots.component.css'
})
export class TimeslotsComponent {
  professional: any = null;
  availabilities: any[] = [];
  filteredAvailabilities: any[] = [];
  isLoading: boolean = true;
  private availabilitiesSubscription: Subscription = new Subscription;

  // Variables pour la recherche
  searchDate: string | null = null;
  selectedProfessionalId: string | null = null;
  professionals = [
    { id: '1', name: 'Dr. Smith' },
    { id: '2', name: 'Dr. Johnson' },
    // Ajoutez plus de professionnels ici
  ];

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

  ngOnDestroy() {
    if (this.availabilitiesSubscription) {
      this.availabilitiesSubscription.unsubscribe();
    }
  }

  loadAvailabilities() {
    this.isLoading = true;
    this.availabilitiesSubscription = this.availabilityService.getAll().subscribe((availabilities: any[]) => {
      this.availabilities = availabilities.filter(
        availability => availability.professionalId === this.professional.id
      );
      this.filteredAvailabilities = [...this.availabilities]; // Initialisation avec toutes les disponibilités
      this.isLoading = false;
    });
  }

  onSearch(event: Event): void {
    event.preventDefault(); // Empêche le rechargement de la page
    let results = [...this.availabilities];

    // Filtrer par date
    if (this.searchDate) {
      results = results.filter(availability => availability.date === this.searchDate);
    }

    // Filtrer par professionnel
    if (this.selectedProfessionalId) {
      results = results.filter(
        availability => availability.professionalId === this.selectedProfessionalId
      );
    }

    this.filteredAvailabilities = results;
  }

  deleteAvailability(id: string) {
    this.availabilityService.delete(id);
  }

  updateAvailability(id: string, date: string, time: string) {
    this.availabilityService.update(id, { date, time });
  }
}
