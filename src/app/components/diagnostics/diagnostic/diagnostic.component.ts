import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.css']
})
export class DiagnosticComponent {
  diagnostics: any = [];

  constructor(private dataservice: DataService, private fb: FormBuilder) {
    this.getDiagnostics();

  }
  public getDiagnostics(): void {
    this.dataservice.getDiagnostics().subscribe(data => {
      this.diagnostics = data;
    })
  }

}
