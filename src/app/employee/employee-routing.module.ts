import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { AllEmployeesComponent } from './all-employees/all-employees.component';


const routes: Routes = [
  {
    path: '',
    component: AllEmployeesComponent
  },
  {
    path: ':id',
    component: EmployeesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
