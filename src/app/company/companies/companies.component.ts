import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/Services/crud.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  organizations = [
    {
      id: 1,
      name: 'Google',
      email: 'info@google.com',
      logo: null,
      website: 'google.com'
    }
  ];

  constructor(
    private crudService: CrudService,
  ) { }

  ngOnInit() {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.crudService.getRequest('company').subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
