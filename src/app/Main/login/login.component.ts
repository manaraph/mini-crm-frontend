import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'src/app/Services/crud.service';

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
  ) {
    this.loginForm = this.form.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
   }

  ngOnInit() {
  }

  login() {
    this.crudService.postRequestNoAuth('/auth/signin', this.loginForm.value).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
