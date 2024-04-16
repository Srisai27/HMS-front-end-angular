import { Component, inject } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { DoctorFormComponent } from '../doctor-form/doctor-form.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {
  constructor(private dataservice: DataService) {
    this.getDoctors();
  }
  private offcanvasService = inject(NgbOffcanvas);
  public doctors: any = [];


  public openDoctorForm(doctor = undefined): void {
    const offcanvasRef = this.offcanvasService.open(DoctorFormComponent, { position: 'end', backdrop: true, panelClass: 'new-doctor-form-panel' });
    offcanvasRef.componentInstance.doctor = doctor;

    offcanvasRef.closed.subscribe(resp => {
      if (resp) {
        this.getDoctors();
      }
    });
  }

  public getDoctors(): void {
    this.dataservice.getDoctors().subscribe(data => {
      this.doctors = data;
    })

  }
  public deleteDoctor(doc_id: string): void {
    this.dataservice.deleteDoctor(doc_id).subscribe(response => {
      if (response?.status) {
        this.getDoctors();
      }

    })

  }

}
