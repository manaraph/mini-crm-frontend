import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'src/app/Services/crud.service';
import { UtilService } from 'src/app/Services/util.service';
import { Login } from 'src/app/Models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private form: FormBuilder,
    private crudService: CrudService,
    private utilService: UtilService,
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
      console.log(res);
      const { data } = res;
      this.utilService.setToken(data.token);
    }, err => {
      console.log(err);
    });
  }

}
