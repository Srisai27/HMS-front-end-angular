import { Component, inject, Input } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})
export class DoctorFormComponent {

  constructor(private formbuiler: FormBuilder, private dataservice: DataService) {
    this.buildDoctorForm();

  }

  activeOffcanvas = inject(NgbActiveOffcanvas);
  _doctor: any;
  get doctor(): any {
    return this._doctor;
  }
  @Input('doctor') set doctor(value: any) {
    this._doctor = value;
    this.buildDoctorForm(this._doctor);
  }
  doctorform: FormGroup = new FormGroup({});

  public buildDoctorForm(doctor?: any): void {
    this.doctorform = this.formbuiler.group({
      doc_name: [doctor?.doc_name || '', [Validators.required]],
      doc_age: [doctor?.doc_age || '', [Validators.required]],
      specialization: [doctor?.specialization || '', [Validators.required]],
      email: [doctor?.email || '', [Validators.required]],
      mobile: [doctor?.mobile || '', [Validators.required]],
      address: [doctor?.address || '', [Validators.required]],
      city: [doctor?.city || '', [Validators.required]],
      state: [doctor?.state || '', [Validators.required]]
    })
  }

  public addOrUpdateDoctor(): void {
    if (this.doctorform.invalid) {
      return;
    }
    if (this.doctor) {
      this.dataservice.updateDoctor({ ...this.doctorform.value, doc_id: this.doctor.doc_id }).subscribe(response => {
        if (response && response?.status) {
          this.activeOffcanvas.close(response?.status);
        }
      })

    }
    else {
      this.dataservice.addDoctor(this.doctorform.value).subscribe(response => {
        if (response && response?.status) {
          this.activeOffcanvas.close(response?.status);
        }
      })
    }
  }
}
