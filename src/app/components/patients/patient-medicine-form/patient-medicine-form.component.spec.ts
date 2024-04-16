import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicineFormComponent } from './patient-medicine-form.component';

describe('PatientMedicineFormComponent', () => {
  let component: PatientMedicineFormComponent;
  let fixture: ComponentFixture<PatientMedicineFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientMedicineFormComponent]
    });
    fixture = TestBed.createComponent(PatientMedicineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
