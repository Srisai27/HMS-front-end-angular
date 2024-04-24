import { formatDate } from '@angular/common';
import { Component, Input, ViewChild, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  NgbActiveOffcanvas,
  NgbTypeahead,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap';
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
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-patient-medicine-form',
  templateUrl: './patient-medicine-form.component.html',
  styleUrls: ['./patient-medicine-form.component.css'],
})
export class PatientMedicineFormComponent {
  searchText: any = '';

  activeOffcanvas = inject(NgbActiveOffcanvas);

  @ViewChild('instance', { static: false }) instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  changesUnsubscribe$ = new Subject();

  @Input() patient: any;
  @Input() existingMedicines: any;

  medicines = [];
  selectedMedicines = [];

  selectedMedicinesForm: FormGroup = new FormGroup({});

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.getMedicines();
    this.buildSelectedMedicinesForm();
  }

  select(v: NgbTypeaheadSelectItemEvent): void {
    this.addNewMedicine(v.item);
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
        const selectedMedicines = this.selectedMedicinesForm.value.medicines;
        const filteredMedicines = this.medicines.filter(
          (m: any) =>
            selectedMedicines.every((sm: any) => sm.med_id !== m.med_id) &&
            m.quantity > 0
        );

        return term === ''
          ? filteredMedicines
          : filteredMedicines.filter(
            (v: any) =>
              v.med_name.toLowerCase().indexOf(term.toLowerCase()) > -1
          );
      })
    );
  };

  formatter = (x: any) => '';

  public getMedicines(): void {
    this.dataService.getMedicines().subscribe((data) => {
      this.medicines = data;
    });
  }

  public buildSelectedMedicinesForm(): void {
    this.selectedMedicinesForm = this.fb.group({
      medicines: this.fb.array([]),
    });
  }

  public addNewMedicine(medicine: any) {
    this.selectedMedicinesArray.push(
      this.fb.group({
        med_id: [medicine.med_id],
        med_name: [medicine.med_name],
        req_quantity: [
          1,
          [
            Validators.required,
            Validators.min(1),
            Validators.max(medicine.quantity),
          ],
        ],
        available: [medicine.quantity - 1],
      })
    );
  }

  getMax(id: number) {
    const med = this.medicines.find((m: any) => m.med_id == id);
    return parseInt(med ? med['quantity'] : '0', 10);
  }

  get selectedMedicinesArray() {
    return <FormArray>this.selectedMedicinesForm.get('medicines');
  }

  updateQuantity(v: any, i: number) {
    const sel_med = this.selectedMedicinesArray.at(i).value;
    const med = this.medicines.find((m: any) => m.med_id == sel_med.med_id);
    this.selectedMedicinesArray
      .at(i)
      .get('available')
      ?.patchValue(
        parseInt(med ? med['quantity'] : '0', 10) - sel_med['req_quantity']
      );
  }

  deleteItem(i: number) {
    this.selectedMedicinesArray.removeAt(i);
  }

  issueMedicines() {
    if (this.selectedMedicinesForm.invalid) {
      return;
    }

    const payload: any = [];
    this.selectedMedicinesForm.value.medicines.forEach((m: any) => {
      payload.push({
        p_id: this.patient.p_id,
        med_id: m.med_id,
        quantity: m.req_quantity,
        date_issued: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      });
    });

    this.dataService.issueMedicine(payload).subscribe((response) => {
      if (response && response?.status) {
        this.activeOffcanvas.close(response?.status);
      }
    });
  }
}
