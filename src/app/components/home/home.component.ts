import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public date: Date = new Date();

  public type: 'MONTHLY' | 'YEARLY' = 'YEARLY';
  public startYear: number = this.date.getFullYear() - 12;
  public endYear: number = this.date.getFullYear();

  public year: number = this.date.getFullYear();

  private chartConfig: any = {
    theme: 'fusion',
    paletteColors: ['#006633', '#ffcc33'],
  };

  bedStatisticsDataSource?: Object = undefined;
  bedStatisticsTitle?: string = '';

  patientStatusStatisticsDataSource?: Object = undefined;
  patientStatusStatisticsTitle?: string = '';

  patientAdmitStatisticsDataSource?: Object = undefined;
  patientAdmitStatisticsTitle: string = '';

  constructor(private dataService: DataService) {
    this.showClock();
    this.getData();
  }

  public getData() {
    this.dataService.getBedAllocationData().subscribe((data) => {
      this.showBedStatistics(this.formatDataForVisualization(data));
    });
    this.dataService.getPatientStatusData().subscribe((data) => {
      this.showPatientStatusStatistics(this.formatDataForVisualization(data));
    });
    this.fetchPatientAdmitData();
  }

  public formatTimelyDataForVisualization(data: any): any {
    if (this.type == 'YEARLY') {
      return this.formatDataForVisualization(data);
    }

    return Object.keys(data).map((key) => ({
      label: new Date(2000, parseInt(key) - 1, 1).toLocaleString('default', {
        month: 'short',
      }),
      value: String(data[key]),
    }));
  }

  public formatDataForVisualization(data: any): any {
    return Object.keys(data).map((key) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value: String(data[key]),
    }));
  }

  public fetchPatientAdmitData() {
    const params = {
      type: this.type,
    };
    this.dataService
      .getPatientAdmitData(
        this.type == 'YEARLY'
          ? { ...params, startYear: this.startYear, endYear: this.endYear }
          : { ...params, year: this.year }
      )
      .subscribe((data) => {
        this.showPatientAdmitStatistics(
          this.formatTimelyDataForVisualization(data)
        );
      });
  }

  public showPatientAdmitStatistics(data: any) {
    this.patientAdmitStatisticsTitle =
      this.type == 'YEARLY'
        ? `between ${this.startYear} and ${this.endYear}`
        : `for ${this.year}`;
    this.patientAdmitStatisticsDataSource = {
      chart: {
        ...this.chartConfig,
        xAxisName: this.type == 'YEARLY' ? 'Years' : 'Months',
        yAxisName: 'Admitted Count',
      },
      data,
    };
  }

  public showBedStatistics(data: any) {
    this.bedStatisticsTitle = 'Bed Allocations';
    this.bedStatisticsDataSource = {
      chart: this.chartConfig,
      data,
    };
  }

  public showPatientStatusStatistics(data: any) {
    this.patientStatusStatisticsTitle = 'Patient Status';
    this.patientStatusStatisticsDataSource = {
      chart: this.chartConfig,
      data,
    };
  }

  public showClock() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }
}
