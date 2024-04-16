import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent {
  public doctorId?: string = '';

  constructor(private route: ActivatedRoute) {
    this.doctorId = this.route.snapshot.paramMap.get('id') || '';
  }

}
