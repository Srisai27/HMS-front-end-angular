import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css'],
})
export class DoctorDetailsComponent {
  public doctorId?: string = '';
  doctorDetails: any = {};

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.doctorId = this.route.snapshot.paramMap.get('id') || '';
    if (this.doctorId != '') {
      this.dataService.getDoctorDetails(this.doctorId).subscribe((data) => {
        this.doctorDetails = data;
      });
    }
  }
}
