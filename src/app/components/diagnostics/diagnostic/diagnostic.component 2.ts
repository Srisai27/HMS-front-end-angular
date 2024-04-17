import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { DiagnosticFormComponent } from '../diagnostic-form/diagnostic-form.component';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.css']
})
export class DiagnosticComponent {
  diagnostics: any = [];
  private offcanvasService = inject(NgbOffcanvas);


  public openDiagnosticForm(diagnostic = undefined): void {
    const offcanvasRef = this.offcanvasService.open(DiagnosticFormComponent, { position: 'end', backdrop: true, panelClass: 'new-diagnostic-form-panel' });
    offcanvasRef.componentInstance.diagnostic = diagnostic;

    offcanvasRef.closed.subscribe(resp => {
      if (resp) {
        this.getDiagnostics();
      }
    });
  }

  constructor(private dataservice: DataService, private fb: FormBuilder) {
    this.getDiagnostics();

  }
  public getDiagnostics(): void {
    this.dataservice.getDiagnostics().subscribe(data => {
      this.diagnostics = data;
    })
  }


  public deleteDiagnostic(d_id: string): void {
    this.dataservice.deleteDiagnostic(d_id).subscribe(response => {
      if (response?.status) {
        this.getDiagnostics();
      }

    })

  }

}