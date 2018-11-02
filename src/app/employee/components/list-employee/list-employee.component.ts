import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  employees: MatTableDataSource<Employee>;
  displayedColumns: string[];

  constructor(private http: HttpClient) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.displayedColumns = ['fullName', 'dateOfBirth', 'department'];
    this.getEmployees();
  }

  getEmployees() {
    const url = 'http://employees-api.azurewebsites.net/api/Employees/GetAll';
    this.http.get(url).subscribe((employees: Employee[]) => {
      this.employees = new MatTableDataSource<Employee>(employees);
      this.employees.paginator = this.paginator;
    });
  }

  getpopupEvent(event: boolean) {
    if (event) {
      this.getEmployees();
    } else {
      this.activatePopup(-1);
    }
  }

  activatePopup(employeeId: number) {
    let employees = this.employees.data;
    employees.map(employee => {
      if (employee.employeeId === employeeId) {
        employee.activate = true;
      } else {
        delete employee.activate
      }

      return employee;
    });
    this.employees.data = employees;
  }
}
