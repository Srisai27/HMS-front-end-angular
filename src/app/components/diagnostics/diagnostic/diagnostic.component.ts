import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { DiagnosticFormComponent } from '../diagnostic-form/diagnostic-form.component';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.css'],
})
export class DiagnosticComponent {
  diagnostics: any = [];
  private toastService = inject(ToastService);
  private offcanvasService = inject(NgbOffcanvas);

  page = 1;
  pageSize = 5;
  collectionSize = 0;
  diagnostics_all: any = [];

  public openDiagnosticForm(diagnostic = undefined): void {
    const offcanvasRef = this.offcanvasService.open(DiagnosticFormComponent, {
      position: 'end',
      backdrop: true,
      panelClass: 'new-diagnostic-form-panel',
    });
    offcanvasRef.componentInstance.diagnostic = diagnostic;

    offcanvasRef.closed.subscribe((resp) => {
      if (resp) {
        this.getDiagnostics();
      }
    });
  }

  constructor(private dataservice: DataService, private fb: FormBuilder) {
    this.getDiagnostics();
  }
  public getDiagnostics(): void {
    this.dataservice.getDiagnostics().subscribe((data) => {
      this.diagnostics_all = data;
      this.collectionSize = this.diagnostics_all.length;
      this.refreshDiagnostics();
    });
  }

  public refreshDiagnostics() {
    this.diagnostics = this.diagnostics_all
      .map((p: any, i: number) => ({
        idx: i,
        ...p,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  private showConfirmation(message: string): void {
    this.toastService.show({ message });
  }

  public deleteDiagnostic(d_id: string, name: string): void {
    this.dataservice.deleteDiagnostic(d_id).subscribe((response) => {
      if (response?.status) {
        this.showConfirmation(`Diagnostic deleted successfully - ${name} `);
        this.getDiagnostics();
      }
    });
  }
}
