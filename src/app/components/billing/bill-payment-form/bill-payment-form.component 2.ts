import { Component } from '@angular/core';

@Component({
  selector: 'app-bill-payment-form',
  templateUrl: './bill-payment-form.component.html',
  styleUrls: ['./bill-payment-form.component.css']
})
export class BillPaymentFormComponent {

  selectedCardProvider: string = '';
  loading = true;

  constructor() {
    setTimeout(() => {
      this.loading = false;
    }, 5000)
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
