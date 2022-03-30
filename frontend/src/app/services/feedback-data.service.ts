import { addService, setServices } from './../store/actions/feedback.action';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../interfaces/Service';
import { Body } from '../interfaces/Body';

@Injectable({
  providedIn: 'root'
})
export class FeedbackDataService {
  res: any = []

  constructor(
    private api: HttpClient,
    private store: Store,
  ) { }

  getToken = () => {
    const local = localStorage.getItem('token')
    if (local) {
      return JSON.parse(local).token
    } else {
      return null
    }
  }

  getServices = async () => {
    const local = localStorage.getItem('token')
    if (local) {
      try {
        const { token } = JSON.parse(local)
        this.api.get('/api/service', {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          })
        }).subscribe({
          next: res => {
            let array: Array<any> = []
            if (res) {
              this.res = res
              this.res.forEach((service: Service) => {
                const { name, code, rating, questions } = service
                array.push({
                  name, code, rating, questions
                })
              });
            }
            this.store.dispatch(setServices({ services: array }))
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  saveService = async (service: Service) => {
    const local = localStorage.getItem('token')
    if (local) {
      const { token } = JSON.parse(local)
      this.api.post('/api/service/add', service, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        })
      }).subscribe({
        next: res => {
          this.store.dispatch(addService({ service: service }))
          console.log(res)
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }

  deleteService = (code: number) => {
    const token = this.getToken()
    if (token) {
      this.api.delete(`/api/service/${code}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        })
      }).subscribe({
        next: res => {
          return res
        },
        error: e => {
          alert(e.message)
        }
      })
    }
  }

  addRating = async (body: Body) => {
    const token = this.getToken()

    if (token) {
      this.api.put(`/api/service/${body.code}`, body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        })
      }).subscribe({
        next: res => {
          console.log(res)
          this.getServices()
        },
        error: err => console.log(err)
      })
    }
  }
}
