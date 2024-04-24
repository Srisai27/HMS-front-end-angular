import { Component, Input, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
  NgbActiveOffcanvas,
  NgbTypeahead,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import {
  OperatorFunction,
  Observable,
  debounceTime,
  map,
  Subject,
  distinctUntilChanged,
  filter,
  merge,
  takeUntil,
} from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-patient-diagnostic-form',
  templateUrl: './patient-diagnostic-form.component.html',
  styleUrls: ['./patient-diagnostic-form.component.css'],
})
export class PatientDiagnosticFormComponent {
  _patient: any;
  get patient(): any {
    return this._patient;
  }
  @Input('patient') set patient(value: any) {
    this._patient = value;
  }

  @Input() existingDiagnostics: any;

  searchText: any = '';
  activeOffcanvas = inject(NgbActiveOffcanvas);
  @ViewChild('instance', { static: false }) instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  changesUnsubscribe$ = new Subject();
  diagnosis: any = [];
  selectedDiagnosisForm: FormGroup = new FormGroup({});

  select(v: NgbTypeaheadSelectItemEvent): void {
    this.addNewDiagnostic(v.item);
    this.searchText = '';
  }

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => !this.instance?.isPopupOpen())
    );
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) => {
        const selectedDiagnosis = this.selectedDiagnosisForm.value.diagnosis;
        const filteredDiagnosis = this.diagnosis.filter(
          (m: any) =>
            selectedDiagnosis.every((sm: any) => sm.d_id !== m.d_id) &&
            this.existingDiagnostics.every((sm: any) => sm.d_id !== m.d_id)
        );

        return term === ''
          ? filteredDiagnosis
          : filteredDiagnosis.filter(
              (v: any) =>
                v.d_name.toLowerCase().indexOf(term.toLowerCase()) > -1
            );
      })
    );
  };

  constructor(private dataservice: DataService, private fb: FormBuilder) {
    this.getdiagnosis();
    this.buildSelectedDiagnosisForm();
  }

  formatter = (x: any) => x.d_name;

  public getdiagnosis(): void {
    this.dataservice.getDiagnostics().subscribe((data) => {
      this.diagnosis = data;
    });
  }
  public buildSelectedDiagnosisForm(): void {
    this.selectedDiagnosisForm = this.fb.group({
      diagnosis: this.fb.array([]),
    });
  }
  public addNewDiagnostic(diagnosis: any) {
    this.selectedDiagnosticsArray.push(
      this.fb.group({
        d_name: [diagnosis.d_name],
        d_id: [diagnosis.d_id],
        d_cost: [diagnosis.d_cost],
      })
    );
  }

  get selectedDiagnosticsArray() {
    return <FormArray>this.selectedDiagnosisForm.get('diagnosis');
  }
  deleteItem(i: number) {
    this.selectedDiagnosticsArray.removeAt(i);
  }
  public issueDiagnosis(): void {
    const payload: any = [];
    this.selectedDiagnosisForm.value.diagnosis.forEach((d: any) => {
      payload.push({
        p_id: this.patient.p_id,
        d_id: d.d_id,
        date_issued: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      });
    });
    this.dataservice.issueDiagnostics(payload).subscribe((response) => {
      if (response && response?.status) {
        this.activeOffcanvas.close(response.status);
      }
    });
  }
}
