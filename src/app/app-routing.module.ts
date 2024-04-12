import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PatientComponent } from './components/patient/patient.component';
import { DoctorComponent } from './components/doctor/doctor.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'doctor', component: DoctorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
