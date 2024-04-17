import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPaymentFormComponent } from './bill-payment-form.component';

describe('BillPaymentFormComponent', () => {
  let component: BillPaymentFormComponent;
  let fixture: ComponentFixture<BillPaymentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillPaymentFormComponent]
    });
    fixture = TestBed.createComponent(BillPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
