import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/Services/crud.service';
import { Companies } from 'src/app/Models/companies';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  editActivated = false;
  organizationId: number;

  constructor(
    private crudService: CrudService,
    private form: FormBuilder,
    private router: Router,
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

  viewEmployees(organizationId) {
    this.router.navigate([`/employees/${organizationId}`]);
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

  editCompany() {
    this.crudService.putRequest(`company/${this.organizationId}`, this.companyForm.value).subscribe((res: Companies) => {
      this.message = 'Company was updated successfully';
      this.getAllCompanies();
    }, err => {
      const { error } = err;
      this.message = error.message;
    });
  }

  deleteCompany(organization) {
    Swal.fire({
			title: 'warning!',
			text: `You are about to delete ${organization.name}, Please confirm`,
			icon: 'warning',
			confirmButtonColor: '#dc3545',
			confirmButtonText: '<i class="fa fa-times"></i> Delete',
			confirmButtonAriaLabel: 'Confirm',
		}).then(data => {
      this.crudService.deleteRequest(`company/${organization.id}`).then(res => {
        this.message = 'Company was deleted successfully';
        this.getAllCompanies();
      }).catch(err => {
        const { error } = err;
        this.message = error.message;
      });
    }).catch(err => {
      console.log(err);
    });
  }

}
