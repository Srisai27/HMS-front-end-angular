import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getPatients(): Observable<any> {
    return this.http.get('/assets/mock/data.json');
  }

  public addNewPatient(patient: any): Observable<any> {
    return this.http.post('', patient);
  }
}
