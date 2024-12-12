import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Pour ngModel
import { CommonModule } from '@angular/common'; // Pour *ngIf
import { UserService } from '../../services/user.service'; // Import du service

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
})
export class AuthentificationComponent {
  // État pour gérer l'affichage des formulaires
  isRegistering = false;

  // Données pour le formulaire de connexion
  loginData = { email: '', password: '' };

  // Données pour le formulaire d'inscription
  registerData = { email: '', password: '', confirmPassword: '' };

  constructor(private userService: UserService) {} // Injectez le service

  // Méthode pour gérer la connexion
  onLogin() {
    if (!this.loginData.email || !this.loginData.password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    this.userService.findUserByEmail(this.loginData.email).subscribe({
      next: (users) => {
        if (users.length > 0) {
          const user = users[0];
          // Ici, vérifiez le mot de passe (ajoutez une logique pour vérifier avec le backend si nécessaire)
          console.log('Utilisateur trouvé :', user);
          alert(`Bienvenue, ${user.firstName} ${user.lastName}!`);
        } else {
          alert('Utilisateur non trouvé.');
        }
      },
      error: (err) => {
        console.error('Erreur lors de la connexion :', err);
        alert('Une erreur est survenue lors de la connexion.');
      },
    });
  }

  // Méthode pour gérer l'inscription
  onRegister() {
    if (!this.registerData.email || !this.registerData.password || !this.registerData.confirmPassword) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
  
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
  
    const newUser = {
      firstName: 'Nouvel utilisateur',
      lastName: 'Angular',
      email: this.registerData.email,
      role: 'CLIENT',
      phone: '0000000000',
      profession: 'N/A',
    };
  
    this.userService.createUser(newUser).subscribe({
      next: (result) => {
        alert('Inscription réussie !');
        this.showLogin(); // Revenir au formulaire de connexion
      },
      error: (err) => {
        console.error('Erreur lors de l’inscription :', err);
        alert('Une erreur est survenue lors de l’inscription.');
      },
    });
  }
  

  // Méthodes pour basculer entre connexion et inscription
  showRegister() {
    this.isRegistering = true;
  }

  showLogin() {
    this.isRegistering = false;
  }
}
