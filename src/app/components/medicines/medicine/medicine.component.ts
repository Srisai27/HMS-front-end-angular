import { Component, inject } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { MedicineFormComponent } from '../medicine-form/medicine-form.component';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css'],
})
export class MedicineComponent {
  medicines: any = [];
  private offcanvasService = inject(NgbOffcanvas);
  private toastService = inject(ToastService);

  page = 1;
  pageSize = 5;
  collectionSize = 0;
  medicines_all: any = [];

  public openMedicineForm(medicine = undefined): void {
    const offcanvasRef = this.offcanvasService.open(MedicineFormComponent, {
      position: 'end',
      backdrop: true,
      panelClass: 'new-medicine-form-panel',
    });
    offcanvasRef.componentInstance.medicine = medicine;

    offcanvasRef.closed.subscribe((resp) => {
      if (resp) {
        this.getMedicines();
      }
    });
  }

  constructor(private dataservice: DataService) {
    this.getMedicines();
  }

  public getMedicines(): void {
    this.dataservice.getMedicines().subscribe((data) => {
      this.medicines_all = data;
      this.collectionSize = this.medicines_all.length;
      this.refreshMedicines();
    });
  }

  public refreshMedicines() {
    this.medicines = this.medicines_all
      .map((p: any, i: number) => ({
        idx: i,
        ...p,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  private showConfirmation(message: string): void {
    this.toastService.show({ message });
  }
  public deleteMedicine(d_id: string, name: string): void {
    this.dataservice.deleteMedicine(d_id).subscribe((response) => {
      if (response?.status) {
        this.showConfirmation(`Medicine deleted successfully - ${name} `);
        this.getMedicines();
      }
    });
  }
}
