import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent {
  public patientId?: string = '';
  patientDetails: any = [];

  constructor(private route: ActivatedRoute, private router:Router, private dataservice: DataService) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.patientId = this.route.snapshot.paramMap.get('id') || '';
        if (this.patientId !== '') {
          this.dataservice.getPatientDetails(this.patientId).subscribe((data) => {
            this.patientDetails = data;
          });
        }
      }
    });
  }
}
