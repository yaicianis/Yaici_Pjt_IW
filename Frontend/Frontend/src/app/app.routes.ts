import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { RendezvousComponent } from './components/rendezvous/rendezvous.component';
import { DisponibiliteComponent } from './components/disponibilite/disponibilite.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path : "utilisateur" , component :AuthentificationComponent},
    {path : "rendezvous" , component :RendezvousComponent},
    {path : "disponibilite" , component :DisponibiliteComponent},
    { path: '', redirectTo: '/utilisateur', pathMatch: 'full' }, // Par défaut
    { path: '**', redirectTo: '/utilisateur' } // Route de fallback
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
