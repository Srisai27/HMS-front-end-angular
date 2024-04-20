import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthModule } from '@auth0/auth0-angular';
import { PatientComponent } from './components/patients/patient/patient.component';
import { DoctorComponent } from './components/doctors/doctor/doctor.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientFormComponent } from './components/patients/patient-form/patient-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientDetailsComponent } from './components/patients/patient-details/patient-details.component';
import { DoctorFormComponent } from './components/doctors/doctor-form/doctor-form.component';
import { DoctorDetailsComponent } from './components/doctors/doctor-details/doctor-details.component';
import { MedicineComponent } from './components/medicines/medicine/medicine.component';
import { PatientMedicineFormComponent } from './components/patients/patient-medicine-form/patient-medicine-form.component';
import { DiagnosticComponent } from './components/diagnostics/diagnostic/diagnostic.component';
import { PatientDiagnosticFormComponent } from './components/patients/patient-diagnostic-form/patient-diagnostic-form.component';
import { BillPaymentFormComponent } from './components/billing/bill-payment-form/bill-payment-form.component';
import { PatientCardComponent } from './components/patients/patient-card/patient-card.component';
import { DiagnosticFormComponent } from './components/diagnostics/diagnostic-form/diagnostic-form.component';
import { DoctorCardComponent } from './components/doctors/doctor-card/doctor-card.component';
import { ToastsContainerComponent } from './components/toasts/toasts-container/toasts-container.component';
import { MedicineFormComponent } from './components/medicines/medicine-form/medicine-form.component';

FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PatientComponent,
    DoctorComponent,
    HomeComponent,
    PatientFormComponent,
    PatientDetailsComponent,
    DoctorFormComponent,
    DoctorDetailsComponent,
    MedicineComponent,
    PatientMedicineFormComponent,
    DiagnosticComponent,
    PatientDiagnosticFormComponent,
    BillPaymentFormComponent,
    PatientCardComponent,
    DiagnosticFormComponent,
    DoctorCardComponent,
    ToastsContainerComponent,
    MedicineFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FusionChartsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-z3mtxllsye2binve.us.auth0.com',
      clientId: '2tBvcH6Oe8KMJEXnsvvig17VUtauM4HU',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
