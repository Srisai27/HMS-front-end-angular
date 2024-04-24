import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';
import { PatientDiagnosticFormComponent } from '../patient-diagnostic-form/patient-diagnostic-form.component';
import { PatientMedicineFormComponent } from '../patient-medicine-form/patient-medicine-form.component';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent {
  private offcanvasService = inject(NgbOffcanvas);
  private toastService = inject(ToastService);

  public patientId?: string = '';
  patientDetails: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataservice: DataService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.patientId = this.route.snapshot.paramMap.get('id') || '';
        if (this.patientId !== '') {
          this.getPatientDetails(this.patientId);
        }
      }
    });
  }

  public getPatientDetails(id: any): void {
    this.dataservice.getPatientDetails(id).subscribe((data) => {
      this.patientDetails = data;
    });
  }

  public openDiagnosisFrom(): void {
    const offcanvasRef = this.offcanvasService.open(
      PatientDiagnosticFormComponent,
      { position: 'end', backdrop: true, panelClass: 'new-patient-form-panel' }
    );
    offcanvasRef.componentInstance.patient = this.patientDetails.patient_info;
    offcanvasRef.componentInstance.existingDiagnostics =
      this.patientDetails.diagnostics_info;

    offcanvasRef.closed.subscribe((resp) => {
      if (resp || resp?.status) {
        this.showConfirmation(
          `Diagnostics are successfully prescribed to ${this.patientDetails.patient_info.p_name}`
        );
        this.getPatientDetails(this.patientId);
      }
    });
  }

  public openPatientMedicineForm(): void {
    const offcanvasRef = this.offcanvasService.open(
      PatientMedicineFormComponent,
      { position: 'end', backdrop: true, panelClass: 'new-patient-form-panel' }
    );
    offcanvasRef.componentInstance.patient = this.patientDetails.patient_info;
    offcanvasRef.componentInstance.existingMedicines =
      this.patientDetails.medicines_info;

    offcanvasRef.closed.subscribe((resp) => {
      if (resp || resp?.status) {
        this.showConfirmation(
          `Medicines are successfully prescribed to ${this.patientDetails.patient_info.p_name}`
        );
        this.getPatientDetails(this.patientId);
      }
    });
  }

  private showConfirmation(message: string): void {
    this.toastService.show({ message });
  }
}
