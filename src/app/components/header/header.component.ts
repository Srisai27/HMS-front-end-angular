import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {
  OperatorFunction,
  Observable,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  catchError,
  of,
  map,
} from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  searchCollapsed = true;
  model: any;
  searching = false;
  searchFailed = false;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    private dataService: DataService,
    private router: Router
  ) { }

  search: OperatorFunction<string, any> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) => {
        if (!term || term.length < 3) {
          return of([])
        }
        return this.dataService.searchData(term).pipe(
          map((data: any) => {
            return [...data?.patient_info, ...data?.doctor_info];
          }),
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      }),
      tap(() => (this.searching = false))
    );

  formatter = (x: any) => '';

  select(v: NgbTypeaheadSelectItemEvent): void {
    if (v.item?.p_id) {
      this.router.navigateByUrl(`/patient/${v.item?.p_id}`);
    } else if (v.item?.doc_id) {
      this.router.navigateByUrl(`/doctor/${v.item?.doc_id}`);
    }
  }
}
