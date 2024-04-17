import { formatDate } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css'],
})
export class PatientFormComponent {
  activeOffcanvas = inject(NgbActiveOffcanvas);
  _patient: any;
  get patient(): any {
    return this._patient;
  }
  @Input('patient') set patient(value: any) {
    this._patient = value;
    this.buildPatientForm(this._patient);
  }

  bedtypes: any = [];
  doctors: any = [];

  patientForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.getBedtypes();
    this.getDoctors();
    this.buildPatientForm();
  }

  public getBedtypes(): void {
    this.dataService.getBedtypes().subscribe((data) => {
      this.bedtypes = data;
    });
  }

  public getDoctors(): void {
    this.dataService.getDoctors().subscribe((data) => {
      this.doctors = data;
    });
  }

  public buildPatientForm(patient?: any): void {
    const dojDate = patient?.doj ? new Date(patient?.doj) : null;
    const dojValue = dojDate ? formatDate(dojDate, 'yyyy-MM-dd', 'en-US') : '';

    this.patientForm = this.fb.group({
      p_name: [patient?.p_name || '', [Validators.required]],
      p_age: [patient?.p_age || '', [Validators.required]],
      doj: [
        dojValue ? formatDate(patient?.doj, 'yyyy-MM-dd', 'en-US') : '',
        [Validators.required],
      ],
      bedtype: [patient?.bedtype || '', [Validators.required]],
      p_mobile: [patient?.p_mobile || '', [Validators.required]],
      p_email: [patient?.p_email || '', [Validators.required]],
      address: [patient?.address || '', [Validators.required]],
      city: [patient?.city || '', [Validators.required]],
      state: [patient?.state || '', [Validators.required]],
      doc_id: [patient?.doc_id || '', [Validators.required]],
    });
  }

  public addOrUpdatePatient(): void {
    if (this.patientForm.invalid) {
      return;
    }
    if (this.patient) {
      this.dataService
        .updatePatient({ ...this.patientForm.value, p_id: this.patient.p_id })
        .subscribe((resp) => {
          if (resp && resp?.status) {
            this.activeOffcanvas.close(resp?.status);
          }
        });
    } else {
      this.dataService
        .addNewPatient(this.patientForm.value)
        .subscribe((resp) => {
          if (resp && resp?.status) {
            this.activeOffcanvas.close(resp?.status);
          }
        });
    }
  }
}
