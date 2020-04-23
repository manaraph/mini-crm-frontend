import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/Services/crud.service';
import { Companies } from 'src/app/Models/companies';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  organizations = [];
  companyForm: FormGroup;
  message = '';
  successful = false;

  constructor(
    private crudService: CrudService,
    private form: FormBuilder,
  ) {
    this.companyForm = this.form.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      website: ['', Validators.required],
    });
   }

  ngOnInit() {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.crudService.getRequest('company').subscribe((res: Companies) => {
      const { data } = res;
      this.organizations = data.companies;
    }, err => {
      console.log(err);
    });
  }

  addCompany() {
    this.crudService.postRequest('company', this.companyForm.value).subscribe((res: Companies) => {
      this.message = 'Company was added successfully';
      this.getAllCompanies();
    }, err => {
      const { error } = err;
      this.message = error.message;
    });
  }

}
