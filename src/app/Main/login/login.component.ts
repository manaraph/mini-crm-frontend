import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'src/app/Services/crud.service';
import { UtilService } from 'src/app/Services/util.service';
import { Login } from 'src/app/Models/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message = '';
  successful = false;

  constructor(
    private form: FormBuilder,
    private crudService: CrudService,
    private utilService: UtilService,
    private router: Router,
  ) {
    this.loginForm = this.form.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
   }

  ngOnInit() {
  }

  login() {
    this.crudService.postRequestNoAuth('auth/signin', this.loginForm.value).subscribe((res: Login) => {
      const { data } = res;
      this.message = 'Login successful';
      this.utilService.setToken(data.token);
      this.router.navigate(['companies']); // navigate to homepage
    }, err => {
      const { error } = err;
      this.message = error.message;
    });
  }

}
