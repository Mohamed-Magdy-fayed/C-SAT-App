import { ToastService } from './toast.service';
import { showToast } from './../store/actions/toast.action';
import { Router } from '@angular/router';
import { LoginData } from './../interfaces/login';
import { UserData } from './../interfaces/User';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store'
import { loginUser, logoutUser } from '../store/actions/user.action';
import { catchError, throwError } from 'rxjs';
import { getUser } from '../store/selectors/user.selector';

@Injectable({
  providedIn: 'root'
})
export class AdminToolService {

  constructor(
    private api: HttpClient,
    private store: Store,
    private router: Router,
    private toast: ToastService,
  ) { }

  handleError(error: HttpErrorResponse) {
    return throwError(() => error.error.message)
  }

  checkAuth() {
    const local = localStorage.getItem('token')
    if (local === null) {
      this.store.dispatch(logoutUser())
      this.redirect()
      return
    }

    const { token, name, email } = JSON.parse(local)

    const userData = {
      name,
      email,
      password: token,
    }

    this.store.dispatch(loginUser({ user: userData }))
    this.redirect()
  }

  redirect() {
    this.store.select(getUser).subscribe(user => {
      const url = this.router.url
      if (user.authed) {
        if (url === '/megz/login' || url === '/megz/register') {
          this.toast.show('User logged in!')
          this.router.navigate(['/megz/home'])
        }
      } else {
        if (url !== '/megz/login' && url !== '/megz/register') {
          this.toast.show('Please login first!')
          this.router.navigate(['/megz/login'])
        }
      }
    })
  }

  async registerUser(userData: UserData) {
    try {
      this.api.post('api/users', userData).subscribe({
        next: res => {
          console.log(res)
          if (res) {
            localStorage.setItem('token', JSON.stringify(res))
            this.router.navigate(['/'])
          }
        },
        error: e => console.log(e)
      })
    } catch (error) {
      console.log(error)
    }
  }

  loginUser(userData: LoginData) {
    if (!userData.email || !userData.password) {
      this.toast.show('All fields are required!', true)
    }
    const authedUser = this.api.post('api/users/login', userData)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', JSON.stringify(res))
          this.router.navigate(['/megz/home'])
          const local = localStorage.getItem('token')
          if (local) {
            const { token, name, email } = JSON.parse(local)
            const userData = {
              name,
              email,
              password: token,
            }
            this.store.dispatch(loginUser({ user: userData }))
          }
        }, error: (err) => {
          this.toast.show(err.error.message, true)
        }, complete: () => {
          console.log('completed')
        }
      })
    return authedUser
  }

  logoutUser() {
    this.store.dispatch(logoutUser())
    this.router.navigate(['megz/login'])
    localStorage.removeItem('token')
  }
}
