import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-department-popup',
  templateUrl: './department-popup.component.html',
  styleUrls: ['./department-popup.component.scss']
})
export class DepartmentPopupComponent implements OnInit {
  newDepartment: boolean = true;
  selectUndefinedOptionValue: any;
  @Input() employee: Employee;
  departments: string[];
  selectedDepartment: string;
  @Output()
  departmentChanges: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const url = 'http://employees-api.azurewebsites.net/api/Departments';
    this.http.get(url).subscribe((departments: string[]) => {
      this.departments = departments;
    });
  }

  changeDepartment() {
    if (this.selectedDepartment) {
      const url = 'http://employees-api.azurewebsites.net/api/Employees/Update';
      const params = {
        employeeId: this.employee.employeeId,
        department: this.selectedDepartment
      }
      this.http.put(url, params).subscribe(() => {
        this.departmentChanges.emit(true);
      });
    } else {
      this.newDepartment = false;
    }
  }

  cancelChange() {
    this.departmentChanges.emit(false);
  }
}
