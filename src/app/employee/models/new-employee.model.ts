
export class NewEmployee {
  employeeInfo: EmployeeInfo;
  dependents: string[];
  benefits: string[];
}

export class EmployeeInfo {
  name: string;
  dob: Date;
  department: string; 
}