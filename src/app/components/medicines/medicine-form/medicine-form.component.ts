import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-medicine-form',
  templateUrl: './medicine-form.component.html',
  styleUrls: ['./medicine-form.component.css']
})
export class MedicineFormComponent {
  private toastService = inject(ToastService);
  constructor(private dataservice: DataService, private formbuilder: FormBuilder) {

  }

  activeOffcanvas = inject(NgbActiveOffcanvas);
  _medicine: any;
  get medicine(): any {
    return this._medicine;
  }
  @Input('medicine') set medicine(value: any) {
    this._medicine = value;
    this.buildmedicineForm(this._medicine);
  }
  medicineform: FormGroup = new FormGroup({});

  public buildmedicineForm(medicine?: any): void {
    this.medicineform = this.formbuilder.group({
      med_name: [medicine?.med_name || '', [Validators.required]],
      price: [medicine?.price || '', [Validators.required]],
      quantity: [medicine?.quantity || '', [Validators.required]]
    })
  }
  private showConfirmation(message: string): void {
    this.toastService.show({ message });
  }

  public addOrUpdateMedicine(): void {
    if (this.medicineform.invalid) {
      return;
    }
    if (this.medicine) {
      this.dataservice.updateMedicine({ ...this.medicineform.value, med_id: this.medicine.med_id }).subscribe(response => {
        if (response && response?.status) {
          this.showConfirmation(
            `Medicine is successfully updated - ${this.medicine.med_name}`
          );
          this.activeOffcanvas.close(response?.status);
        }
      })

    }
    else {
      this.dataservice.addMedicine(this.medicineform.value).subscribe(response => {
        if (response && response?.status) {
          this.showConfirmation(
            `Medicine added successfully - ${this.medicineform.value.med_name}`
          );
          this.activeOffcanvas.close(response?.status);
        }
      })
    }
  }

}
