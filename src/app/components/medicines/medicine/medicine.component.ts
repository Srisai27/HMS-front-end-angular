import { Component, inject } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { MedicineFormComponent } from '../medicine-form/medicine-form.component';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent {
  medicines: any = []
  private offcanvasService = inject(NgbOffcanvas);
  private toastService = inject(ToastService);

  public openMedicineForm(medicine = undefined): void {
    const offcanvasRef = this.offcanvasService.open(MedicineFormComponent, { position: 'end', backdrop: true, panelClass: 'new-medicine-form-panel' });
    offcanvasRef.componentInstance.medicine = medicine;

    offcanvasRef.closed.subscribe(resp => {
      if (resp) {
        this.getMedicines();
      }
    });
  }
  constructor(private dataservice: DataService) {
    this.getMedicines();

  }

  public getMedicines(): void {
    this.dataservice.getMedicines().subscribe(data => {
      this.medicines = data;
    })
  }
  private showConfirmation(message: string): void {
    this.toastService.show({ message });
  }
  public deleteMedicine(d_id: string, name: string): void {
    this.dataservice.deleteMedicine(d_id).subscribe(response => {
      if (response?.status) {
        this.showConfirmation(
          `Medicine deleted successfully - ${name} `
        );
        this.getMedicines();
      }

    })

  }

}
