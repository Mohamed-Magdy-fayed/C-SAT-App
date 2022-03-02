import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AdminToolService } from 'src/app/services/admin-tool.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  isError: boolean = false
  name = new FormControl('', [
    Validators.required
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  password = new FormControl('', [
    Validators.required
  ])
  passwordConfirmation = new FormControl('', [
    Validators.required
  ])

  constructor(
    private api: HttpClient,
    private admin: AdminToolService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  getError(isError?: boolean) {
    if (this.name.hasError('required') ||
      this.email.hasError('required') ||
      this.password.hasError('required') ||
      this.passwordConfirmation.hasError('required')) {
      this.isError = true
      return 'All fields are required!'
    }
    if (this.email.hasError('email')) {
      this.isError = true
      return 'Not a vaild Email!'
    }
    if (isError === true) {
      this.isError = true
      return `Passwords don't match`
    }
    this.isError = false
    return
  }

  registerUser(e: Event) {
    e.preventDefault()

    if (this.passwordConfirmation.value !== this.password.value) {
      alert('passwords not matching')
      return
    }

    const userData = {
      name : this.name.value,
      email: this.email.value,
      password: this.password.value,
    }

    this.admin.registerUser(userData)
    .then(res => {
      console.log(res);
    })
  }
}
