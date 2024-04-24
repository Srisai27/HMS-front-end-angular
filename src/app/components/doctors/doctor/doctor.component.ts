import { Component, inject } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { DoctorFormComponent } from '../doctor-form/doctor-form.component';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent {
  private toastService = inject(ToastService);
  private offcanvasService = inject(NgbOffcanvas);
  public doctors: any = [];

  page = 1;
  pageSize = 5;
  collectionSize = 0;
  doctors_all: any = [];

  constructor(private dataservice: DataService) {
    this.getDoctors();
  }

  public openDoctorForm(doctor: any = undefined): void {
    const offcanvasRef = this.offcanvasService.open(DoctorFormComponent, {
      position: 'end',
      backdrop: true,
      panelClass: 'new-doctor-form-panel',
    });
    offcanvasRef.componentInstance.doctor = doctor;

    offcanvasRef.closed.subscribe((resp) => {
      if (resp) {
        this.showConfirmation(
          doctor
            ? `${doctor?.doc_name} is Updated Succesfully`
            : 'Doctor Successfully Added'
        );
        this.getDoctors();
      }
    });
  }

  public getDoctors(): void {
    this.dataservice.getDoctors().subscribe((data) => {
      this.doctors_all = data;
      this.collectionSize = this.doctors_all.length;
      this.refreshDoctors();
    });
  }

  public refreshDoctors() {
    this.doctors = this.doctors_all
      .map((p: any, i: number) => ({
        idx: i,
        ...p,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  public deleteDoctor(doc_id: string): void {
    this.dataservice.deleteDoctor(doc_id).subscribe((response) => {
      if (response?.status) {
        this.showConfirmation(`Doctor is successfully deleted`);
        this.getDoctors();
      }
    });
  }

  private showConfirmation(message: string): void {
    this.toastService.show({ message });
  }
}
