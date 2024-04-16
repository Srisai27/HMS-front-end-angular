import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDiagnosticFormComponent } from './patient-diagnostic-form.component';

describe('PatientDiagnosticFormComponent', () => {
  let component: PatientDiagnosticFormComponent;
  let fixture: ComponentFixture<PatientDiagnosticFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientDiagnosticFormComponent]
    });
    fixture = TestBed.createComponent(PatientDiagnosticFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
