import { Component, OnInit } from '@angular/core';
import { DisponibiliteService,TimeSlot } from '../../services/disponibilite.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-disponibilite',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './disponibilite.component.html',
  styleUrls: ['./disponibilite.component.css']
})
export class DisponibiliteComponent implements OnInit {
  // Données pour le formulaire
  newAvailability: Partial<TimeSlot> = { startTime: '', endTime: '', isAvailable: true };

  // Liste des disponibilités
  availabilities: TimeSlot[] = [];

  constructor(private disponibiliteService: DisponibiliteService) {}

  ngOnInit(): void {
    this.loadAvailabilities();
  }

  // Charger toutes les disponibilités depuis le backend
  loadAvailabilities(): void {
    this.disponibiliteService.getAllTimeSlots().subscribe({
      next: (data) => {
        this.availabilities = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des disponibilités', err);
      },
    });
  }

  // Ajouter une disponibilité
  addAvailability(): void {
    if (this.newAvailability.startTime && this.newAvailability.endTime) {
      const availability: TimeSlot = {
        ...this.newAvailability,
        startTime: this.newAvailability.startTime!,
        endTime: this.newAvailability.endTime!,
        isAvailable: true,
      };

      this.disponibiliteService.addTimeSlot(availability).subscribe({
        next: (addedAvailability) => {
          this.availabilities.push(addedAvailability);
          this.newAvailability = { startTime: '', endTime: '', isAvailable: true }; // Réinitialiser le formulaire
        },
        error: (err) => {
          console.error('Erreur lors de l’ajout de la disponibilité', err);
        },
      });
    } else {
      alert('Veuillez remplir tous les champs');
    }
  }

  // Supprimer une disponibilité
  deleteAvailability(id: number): void {
    this.disponibiliteService.deleteTimeSlot(id).subscribe({
      next: () => {
        this.availabilities = this.availabilities.filter((item) => item.id !== id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la disponibilité', err);
      },
    });
  }
}