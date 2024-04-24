import { Component, TemplateRef, inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientFormComponent } from '../patient-form/patient-form.component';
import { PatientMedicineFormComponent } from '../patient-medicine-form/patient-medicine-form.component';
import { PatientDiagnosticFormComponent } from '../patient-diagnostic-form/patient-diagnostic-form.component';
import { BillPaymentFormComponent } from '../../billing/bill-payment-form/bill-payment-form.component';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent {
  private offcanvasService = inject(NgbOffcanvas);
  private modalService = inject(NgbModal);
  private toastService = inject(ToastService);

  public patients: any = [];

  page = 1;
  pageSize = 5;
  collectionSize = 0;
  patients_all: any = [];

  constructor(private dataService: DataService) {
    this.getPatients();
  }

  public getPatients(): void {
    this.dataService.getPatients().subscribe((data) => {
      this.patients_all = data;
      this.collectionSize = this.patients_all.length;
      this.refreshPatients();
    });
  }

  public refreshPatients() {
    this.patients = this.patients_all
      .map((p: any, i: number) => ({
        idx: i,
        ...p,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  public openPatientForm(patient: any = undefined): void {
    const offcanvasRef = this.offcanvasService.open(PatientFormComponent, {
      position: 'end',
      backdrop: true,
      panelClass: 'new-patient-form-panel',
    });
    offcanvasRef.componentInstance.patient = patient;

    offcanvasRef.closed.subscribe((resp) => {
      if (resp || resp?.status) {
        this.showConfirmation(
          patient
            ? `${patient?.p_name} is Updated Succesfully`
            : 'Patient Successfully Added'
        );
        this.getPatients();
      }
    });
  }

  public openPatientMedicineForm(patient: any): void {
    const offcanvasRef = this.offcanvasService.open(
      PatientMedicineFormComponent,
      { position: 'end', backdrop: true, panelClass: 'new-patient-form-panel' }
    );
    offcanvasRef.componentInstance.patient = patient;

    offcanvasRef.closed.subscribe((resp) => {
      if (resp || resp?.status) {
        this.showConfirmation(
          `Medicines are successfully prescribed to ${patient.p_name}`
        );
      }
    });
  }

  public openDiagnosisFrom(patient: any): void {
    const offcanvasRef = this.offcanvasService.open(
      PatientDiagnosticFormComponent,
      { position: 'end', backdrop: true, panelClass: 'new-patient-form-panel' }
    );
    offcanvasRef.componentInstance.patient = patient;

    offcanvasRef.closed.subscribe((resp) => {
      if (resp || resp?.status) {
        this.showConfirmation(
          `Diagnostics are successfully prescribed to ${patient.p_name}`
        );
      }
    });
  }

  public openBillPaymentFrom(patient: any): void {
    const modelRef = this.modalService.open(BillPaymentFormComponent, {
      centered: true,
      backdrop: true,
      modalDialogClass: 'bill-payment-modal',
      size: 'xl',
    });
    modelRef.componentInstance.patient = patient;

    modelRef.closed.subscribe((resp) => {
      if (resp || resp?.status) {
        this.showConfirmation(`Payment is successfully completed`);
        this.getPatients();
      }
    });
  }

  public deletePatient(id: string): void {
    this.dataService.deletePatient(id).subscribe((resp) => {
      if (resp?.status) {
        this.showConfirmation(`Patient is successfully deleted`);
        this.getPatients();
      }
    });
  }

  private showConfirmation(message: string): void {
    this.toastService.show({ message });
  }
}
