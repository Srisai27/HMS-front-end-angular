import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const HOST = 'http://192.168.0.205:8000';
const ROOT = 'gmushs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) { }

  public getBedtypes(): Observable<any> {
    const url = '/assets/mock/roomtypes.json';
    // const url = `${HOST}/${ROOT}/get_room_type`;
    return this.http.get(url);
  }

  // Doctors

  public getDoctors(): Observable<any> {
    const url = '/assets/mock/doctors.json';
    // const url = `${HOST}/${ROOT}/get_doctors`;
    return this.http.get(url);
  }

  public deleteDoctor(id: string): Observable<any> {
    const url = `${HOST}/${ROOT}/delete_doctor/${id}`;
    return this.http.delete(url);
  }

  public addDoctor(doctor: any): Observable<any> {
    const url = `${HOST}/${ROOT}/add_doctor`;
    return this.http.post(url, doctor);
  }

  public updateDoctor(doctor: any): Observable<any> {
    const url = `${HOST}/${ROOT}/update_doctor`;
    return this.http.put(url, doctor);
  }

  public getDoctorDetails(id: string): Observable<any> {
    const url = '/assets/mock/doctor-details.json';
    // const url = `${HOST}/${ROOT}/get_patients_by_doctor/${id}`;
    return this.http.get(url);
  }

  //// Patients

  public getPatients(): Observable<any> {
    const url = '/assets/mock/patients.json';
    // const url = `${HOST}/${ROOT}/get_patient`;
    return this.http.get(url);
  }

  public addNewPatient(patient: any): Observable<any> {
    const url = `${HOST}/${ROOT}/add_patient`;
    return this.http.post(url, patient);
  }

  public updatePatient(patient: any): Observable<any> {
    const url = `${HOST}/${ROOT}/update_patient`;
    return this.http.put(url, patient);
  }

  public deletePatient(id: string): Observable<any> {
    const url = `${HOST}/${ROOT}/delete_patient/${id}`;
    return this.http.delete(url);
  }

  public getPatientDetails(id: string): Observable<any> {
    const url = '/assets/mock/patient-details.json';
    // const url = `${HOST}/${ROOT}/get_all_patient_details/${id}`;
    return this.http.get(url);
  }

  // Medicines

  public getMedicines(): Observable<any> {
    const url = `${HOST}/${ROOT}/get_medicines`;
    return this.http.get(url);
  }

  public issueMedicine(payload: any): Observable<any> {
    const url = `${HOST}/${ROOT}/issue_medicine`;
    return this.http.post(url, payload);
  }

  // Diagnostics

  public getDiagnostics(): Observable<any> {
    // const url = '/assets/mock/diagnostics.json';
    const url = `${HOST}/${ROOT}/get_diagnostics`;
    return this.http.get(url);
  }

  public issueDiagnostics(payload: any): Observable<any> {
    const url = `${HOST}/${ROOT}/issue_diagnostic`;
    return this.http.post(url, payload);
  }

  public addDiagnostic(diagnostic: any): Observable<any> {
    const url = `${HOST}/${ROOT}/add_diagnostic`;
    return this.http.post(url, diagnostic);
  }

  public updateDiagnostic(diagnostic: any): Observable<any> {
    const url = `${HOST}/${ROOT}/update_diagnostic`;
    return this.http.put(url, diagnostic);
  }

  public deleteDiagnostic(id: string): Observable<any> {
    const url = `${HOST}/${ROOT}/delete_diagnostics/${id}`;
    return this.http.delete(url);
  }

  // Billings

  public getBillingDetails(p_id: string): Observable<any> {
    const url = '/assets/mock/get_bill.json';
    // const url = `${HOST}/${ROOT}/get_bill/${p_id}`;
    return this.http.get(url);
  }

  public calculateBill(p_id: string): Observable<any> {
    const url = '/assets/mock/calculate_bill.json';
    // const url = `${HOST}/${ROOT}/calculate_bill/${p_id}`;
    return this.http.get(url);
  }

  public makePayment(p_id: string): Observable<any> {
    const url = '/assets/mock/calculate_bill.json';
    // const url = `${HOST}/${ROOT}/make_payment/${p_id}`;
    return this.http.post(url, {});
  }
}
