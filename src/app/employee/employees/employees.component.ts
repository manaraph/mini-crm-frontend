import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'src/app/Services/crud.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Employees } from 'src/app/Models/employees';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees = [];
  employeeForm: FormGroup;
  message = '';
  successful = false;
  editActivated = false;
  employeeId: number;

  constructor(
    private crudService: CrudService,
    private form: FormBuilder,
  ) {
    this.employeeForm = this.form.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      company: 1
    });
   }

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.crudService.getRequest('employee').subscribe((res: Employees) => {
      const { data } = res;
      this.employees = data.employees;
    }, err => {
      console.log(err);
    });
  }

  addEmployee() {
    this.crudService.postRequest('employee', this.employeeForm.value).subscribe((res: Employees) => {
      this.message = 'Employee was added successfully';
      this.getAllEmployees();
    }, err => {
      const { error } = err;
      this.message = error.message;
    });
  }

  editEmployee() {
    this.crudService.putRequest(`employee/${this.employeeId}`, this.employeeForm.value).subscribe((res: Employees) => {
      this.message = 'Employee was updated successfully';
      this.getAllEmployees();
    }, err => {
      const { error } = err;
      this.message = error.message;
    });
  }

  deleteEmployee(employee) {
    Swal.fire({
			title: 'warning!',
			text: `You are about to delete ${employee.firstname} ${employee.lastname}, Please confirm`,
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
			confirmButtonColor: '#dc3545',
			confirmButtonText: '<i class="fa fa-times"></i> Delete',
			confirmButtonAriaLabel: 'Confirm',
		}).then(result => {
      if (result.value) {
        this.crudService.deleteRequest(`employee/${employee.id}`).then(res => {
          Swal.fire(
            'Deleted!',
            'The employee has been deleted.',
            'success'
          );
          this.getAllEmployees();
        }).catch(err => {
          const { error } = err;
          this.message = error.message;
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

}
