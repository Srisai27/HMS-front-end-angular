import { AfterViewInit, Component, TemplateRef, inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent {

  private offcanvasService = inject(NgbOffcanvas);

  public patients: any = [];

  constructor(private dataService: DataService) {
    this.getPatients();
  }

  public getPatients(): void {
    this.dataService.getPatients().subscribe(data => {
      this.patients = data?.patients;
    });
  }

  public openNewPatientForm(content: TemplateRef<any>): void {
    this.offcanvasService.open(content, { position: 'end', scroll: true, panelClass: 'new-patient-form-panel' });
  }

  public addNewPatient(): void {
    const patient: any = {};
    this.dataService.addNewPatient(patient);
  }

}
