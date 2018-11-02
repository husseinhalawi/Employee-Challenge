import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { NewEmployee, EmployeeInfo } from '../../models/new-employee.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  newEmployee: NewEmployee;
  isLinear: boolean;
  dependents: string[];
  availableBenefits: string[];
  assignedBenefits: string[];
  draggedValue: string;
  stringifyNewEmployee: string;
  @ViewChild('dependent') dependent; 

  constructor(
    private renderer: Renderer2
  ) {
    this.isLinear = true;
    this.newEmployee = new NewEmployee();
    this.newEmployee.employeeInfo = new EmployeeInfo();
    this.dependents = [];
    this.availableBenefits = [
      'Meal',
      'Travel',
      'Transportation',
      'Phone',
      'Accommodation'
    ]
    this.assignedBenefits = [];
  }

  ngOnInit() {
  }

  addDependent() {
    this.dependents.push('');
  }

  remove(index) {
    this.dependents.splice(index, 1);
  }

  changeDependent(index, value) {
    this.dependents[index] = value;
  }

  getDependents() {
    this.newEmployee.dependents = this.dependents.filter(dependent => {
      if (dependent !== '') {
        return dependent;
      }
    });
  }

  assignBenefit(ev) {
    ev.preventDefault();
    this.availableBenefits = this.availableBenefits.filter(benefit => {
      if (benefit !== this.draggedValue) {
        return benefit;
      }
    });

    this.assignedBenefits.push(this.draggedValue);
  }

  cancelBenefit(ev) {
    ev.preventDefault();
    this.assignedBenefits = this.assignedBenefits.filter(benefit => {
      if (benefit !== this.draggedValue) {
        return benefit;
      }
    });

    this.availableBenefits.push(this.draggedValue);
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    this.draggedValue = ev.target.childNodes[0].data;
  }

  getSelectedBenefits() {
    this.newEmployee.benefits = this.assignedBenefits;

    this.stringifyNewEmployee = '{\n' +
    '    "Employee Info": {\n' +
    `        "Name": "${this.newEmployee.employeeInfo.name}",\n` +
    `        "DOB": "${this.newEmployee.employeeInfo.dob}",\n` +
    `        "Department": "${this.newEmployee.employeeInfo.department}",\n` +
    '    },\n' +
    `    "Dependents": ${JSON.stringify(this.newEmployee.dependents)},\n` +
    `    "Benefits": ${JSON.stringify(this.newEmployee.benefits)}\n` +
    '}'
  }
}
