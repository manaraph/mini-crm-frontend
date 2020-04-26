import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/Services/crud.service';
import { Companies } from 'src/app/Models/companies';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.scss']
})
export class AllEmployeesComponent implements OnInit {
  employees = [];
  organizations = [];

  constructor(
    private crudService: CrudService,
  ) {
   }

  async ngOnInit() {
    this.getAllCompanies();
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.crudService.getRequest(`employee`).subscribe((res: any) => {
      const { data } = res;
      const employees = data.employees;
      employees.forEach(employee => {
        const company = this.organizations.filter(org => employee.company === org.id);
        employee.companyName = company[0].name;
      });
      this.employees = employees;
    }, err => {
      console.log(err);
    });
  }

  getAllCompanies() {
    this.crudService.getRequest('company').subscribe((res: Companies) => {
      const { data } = res;
      this.organizations = data.companies;
    }, err => {
      console.log(err);
    });
  }

}
