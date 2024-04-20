import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PatientComponent } from './components/patients/patient/patient.component';
import { DoctorComponent } from './components/doctors/doctor/doctor.component';
import { PatientDetailsComponent } from './components/patients/patient-details/patient-details.component';
import { DoctorDetailsComponent } from './components/doctors/doctor-details/doctor-details.component';
import { MedicineComponent } from './components/medicines/medicine/medicine.component';
import { DiagnosticComponent } from './components/diagnostics/diagnostic/diagnostic.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'patient/:id', component: PatientDetailsComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'doctor/:id', component: DoctorDetailsComponent },
  { path: 'medicine', component: MedicineComponent },
  { path: 'diagnostic', component: DiagnosticComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
