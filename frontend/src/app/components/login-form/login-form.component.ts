import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminToolService } from 'src/app/services/admin-tool.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  password = new FormControl('', [
    Validators.required
  ])
  errorMessage: string = ''
  isError: boolean = false

  constructor(
    private admin: AdminToolService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  getError() {
    if (this.email.hasError('required') || this.password.hasError('required')) {
      return 'All fields are required!'
    }
    if (this.email.hasError('email')) {
      return 'Not a vaild Email!'
    }
    return ''
  }

  loginUser(e: Event) {
    e.preventDefault()

    const userData = {
      email: this.email.value,
      password: this.password.value,
    }
    this.admin.loginUser(userData)
  }
}
