import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { DisponibiliteComponent } from './components/disponibilite/disponibilite.component';
import { RendezvousComponent } from './components/rendezvous/rendezvous.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule, // Ajoutez ceci pour utiliser [routerLink]
    AuthentificationComponent,
    DisponibiliteComponent,
    RendezvousComponent,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
}
