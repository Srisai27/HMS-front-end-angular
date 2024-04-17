import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent {
  medicines: any = []

  constructor(private dataservice: DataService) {
    this.dataservice.getMedicines().subscribe(data => {
      this.medicines = data;
    })
  }

}
