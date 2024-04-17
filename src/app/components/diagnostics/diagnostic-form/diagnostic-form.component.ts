import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-diagnostic-form',
  templateUrl: './diagnostic-form.component.html',
  styleUrls: ['./diagnostic-form.component.css']
})
export class DiagnosticFormComponent {

  constructor(private formbuiler: FormBuilder, private dataservice: DataService) {
    this.buildDiagnosticForm();

  }

  activeOffcanvas = inject(NgbActiveOffcanvas);
  _diagnostic: any;
  get diagnostic(): any {
    return this._diagnostic;
  }
  @Input('diagnostic') set diagnostic(value: any) {
    this._diagnostic = value;
    this.buildDiagnosticForm(this._diagnostic);
  }
  diagnosticform: FormGroup = new FormGroup({});

  public buildDiagnosticForm(diagnostic?: any): void {
    this.diagnosticform = this.formbuiler.group({
      d_name: [diagnostic?.d_name || '', [Validators.required]],
      d_cost: [diagnostic?.d_cost || '', [Validators.required]]
    })
  }

  public addOrUpdateDiagnostic(): void {
    if (this.diagnosticform.invalid) {
      return;
    }
    if (this.diagnostic) {
      this.dataservice.addDiagnostic({ ...this.diagnosticform.value, d_id: this.diagnostic.d_id }).subscribe(response => {
        if (response && response?.status) {
          this.activeOffcanvas.close(response?.status);
        }
      })

    }
    else {
      this.dataservice.updateDiagnostic(this.diagnosticform.value).subscribe(response => {
        if (response && response?.status) {
          this.activeOffcanvas.close(response?.status);
        }
      })
    }
  }


}
