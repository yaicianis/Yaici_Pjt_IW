import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rendezvous',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css'],
})
export class RendezvousComponent {
  // Filtres pour les rendez-vous
  filters = { date: '', status: '' };

  // Liste des rendez-vous (exemple de données pour démarrer)
  appointments = [
    { id: 1, appointmentDate: '2024-11-22', status: 'SCHEDULED' },
    { id: 2, appointmentDate: '2024-11-23', status: 'CANCELLED' },
    { id: 3, appointmentDate: '2024-11-24', status: 'COMPLETED' },
  ];

  // Propriété pour les rendez-vous filtrés
  filteredAppointments = [...this.appointments];

  // Nouveau rendez-vous
  newAppointment = { appointmentDate: '', status: 'SCHEDULED' };

  // Filtrer les rendez-vous
  filterAppointments() {
    this.filteredAppointments = this.appointments.filter((rdv) => {
      return (
        (!this.filters.date || rdv.appointmentDate === this.filters.date) &&
        (!this.filters.status || rdv.status === this.filters.status)
      );
    });
  }

  // Ajouter un nouveau rendez-vous
  createAppointment() {
    const newId = this.appointments.length + 1;
    this.appointments.push({
      id: newId,
      ...this.newAppointment,
    });
    alert('Rendez-vous ajouté avec succès !');
    this.newAppointment = { appointmentDate: '', status: 'SCHEDULED' }; // Réinitialiser le formulaire
    this.filterAppointments();
  }

  // Mettre à jour le statut d'un rendez-vous
  updateStatus(rdv: any, newStatus: string) {
    rdv.status = newStatus;
    alert(`Le statut du rendez-vous a été mis à jour en ${newStatus}`);
    this.filterAppointments();
  }
}
