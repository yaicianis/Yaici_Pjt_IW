import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { DashboardClientComponent } from './pages/client/dashboard-client/dashboard-client.component';
import { AddAppointmentsComponent } from './pages/client/add-appointments/add-appointments.component';
import { DashboardProfessionalComponent } from './pages/professional/dashboard-professional/dashboard-professional.component';
import { TimeslotsComponent } from './pages/professional/timeslots/timeslots.component';
import { AddTimeslotComponent } from './pages/professional/add-timeslot/add-timeslot.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard-client', component: DashboardClientComponent },
    { path: 'client-add-appointments', component: AddAppointmentsComponent },
    { path: 'dashboard-professional', component: DashboardProfessionalComponent },
    { path: 'professional-availabilitys', component: TimeslotsComponent },
    { path: 'professional-add-availabilitys', component: AddTimeslotComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}