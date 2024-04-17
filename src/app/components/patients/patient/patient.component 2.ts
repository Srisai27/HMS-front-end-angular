import { Component, inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientFormComponent } from '../patient-form/patient-form.component';
import { PatientMedicineFormComponent } from '../patient-medicine-form/patient-medicine-form.component';
import { PatientDiagnosticFormComponent } from '../patient-diagnostic-form/patient-diagnostic-form.component';
import { BillPaymentFormComponent } from '../../billing/bill-payment-form/bill-payment-form.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent {

  private offcanvasService = inject(NgbOffcanvas);
  private modalService = inject(NgbModal);

  public patients: any = [];

  constructor(private dataService: DataService) {
    this.getPatients();
  }

  public getPatients(): void {
    this.dataService.getPatients().subscribe(data => {
      this.patients = data;
    });
  }

  public openPatientForm(patient = undefined): void {
    const offcanvasRef = this.offcanvasService.open(PatientFormComponent, { position: 'end', backdrop: true, panelClass: 'new-patient-form-panel' });
    offcanvasRef.componentInstance.patient = patient;

    offcanvasRef.closed.subscribe(resp => {
      if (resp) {
        this.getPatients();
      }
      else if (resp?.status) {
        this.getPatients();

      }
    });
  }

  public openPatientMedicineForm(patient: any): void {
    const offcanvasRef = this.offcanvasService.open(PatientMedicineFormComponent, { position: 'end', backdrop: true, panelClass: 'new-patient-form-panel' });
    offcanvasRef.componentInstance.patient = patient;
  }

  public openDiagnosisFrom(patient: any): void {
    const offcanvasRef = this.offcanvasService.open(PatientDiagnosticFormComponent, { position: 'end', backdrop: true, panelClass: 'new-patient-form-panel' });
    offcanvasRef.componentInstance.patient = patient;
  }

  public openBillPaymentFrom(patient: any): void {
    this.modalService.open(BillPaymentFormComponent, { centered: true, backdrop: true, modalDialogClass: 'bill-payment-modal', size: 'xl' });
  }

  public deletePatient(id: string): void {
    this.dataService.deletePatient(id).subscribe(resp => {
      if (resp?.status) {
        this.getPatients();
      }
    });
  }

}
