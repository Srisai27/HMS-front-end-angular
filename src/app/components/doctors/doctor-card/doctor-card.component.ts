import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.css'],
})
export class DoctorCardComponent {
  @Input() doctor: any;
}
