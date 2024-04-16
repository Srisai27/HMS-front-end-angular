import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent {
  public patientId?: string = '';
  patientDetails: any = [];

  constructor(private route: ActivatedRoute, private dataservice: DataService) {
    this.patientId = this.route.snapshot.paramMap.get('id') || '';
    if (this.patientId != '') {
      this.dataservice.getPateintDetails(this.patientId).subscribe(data => {
        this.patientDetails = data;

      })
    }
  }
}
