import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-bill-payment-form',
  templateUrl: './bill-payment-form.component.html',
  styleUrls: ['./bill-payment-form.component.css'],
})
export class BillPaymentFormComponent {
  _patient: any;
  get patient(): any {
    return this._patient;
  }
  @Input('patient') set patient(value: any) {
    this._patient = value;
    this.calculateBill(this.patient?.p_id);
  }

  activeModal = inject(NgbActiveModal);

  selectedCardProvider: string = '';
  loading = true;

  billDetails: any = undefined;

  constructor(private dataService: DataService) {}

  public calculateBill(id: any): void {
    this.dataService.calculateBill(id).subscribe((data) => {
      if (data.status) {
        setTimeout(() => {
          this.getBill(id);
        }, 3000);
      }
    });
  }

  public getBill(id: any): void {
    this.dataService.getBillingDetails(id).subscribe((data) => {
      this.loading = false;
      this.billDetails = data;
    });
  }

  public makePayment(): any {
    this.dataService.makePayment(this.patient?.p_id).subscribe((data) => {
      if (data?.status) {
        this.activeModal.close(data);
      }
    });
  }

  public selectCardProvider(e: any): void {
    const value = e.target.value;
    if (!value) {
      this.selectedCardProvider = '';
    } else {
      const starting = value[0];

      switch (starting) {
        case '2':
        case '5':
          this.selectedCardProvider = 'assets/icons/mastercard.png';
          break;
        case '4':
          this.selectedCardProvider = 'assets/icons/visa.png';
          break;
        case '3':
          this.selectedCardProvider = 'assets/icons/american-express.png';
          break;
        case '6':
          this.selectedCardProvider = 'assets/icons/discover.png';
          break;
        default:
          this.selectedCardProvider = '';
          break;
      }
    }
  }
}
