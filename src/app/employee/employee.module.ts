import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { EmployeeRoutingModule } from './employee-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DepartmentPopupComponent } from './components/department-popup/department-popup.component';
import { FormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { MatStepperModule } from '@angular/material/stepper';

const angularMaterialModules = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatStepperModule,
]

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    EmployeeRoutingModule,
    HttpClientModule,
    ...angularMaterialModules
  ],
  declarations: [HomeComponent, LayoutComponent, ListEmployeeComponent, DepartmentPopupComponent, AddEmployeeComponent]
})
export class EmployeeModule { }
