import { addService, setServices } from './../store/actions/feedback.action';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../interfaces/Service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackDataService {
  res: any = []

  constructor(
    private api: HttpClient,
    private store: Store,
  ) { }

  callAPI = async (api: string) => {

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
              this.res.forEach((service: any) => {
                const { name, code, questions } = service
                array.push({
                  name, code, questions
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
}
