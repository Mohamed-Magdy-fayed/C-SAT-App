import { getServices } from './../../store/selectors/feedback.selector';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FeedbackDataService } from './../../services/feedback-data.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Question, Service } from 'src/app/interfaces/Service';
import { ToastService } from 'src/app/services/toast.service';
import { getUser } from 'src/app/store/selectors/user.selector';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
  isLoading: boolean = true
  service: Service = {
    name: '',
    code: 0,
    rating: 0,
    questions: [],
  }

  questions: [
    {
      question: Question,
      control: FormControl,
    }
  ] = [{
    question: {
      question: '',
      option1: {
        text: '',
        ratings: []
      },
      option2: {
        text: '',
        ratings: []
      },
      option3: {
        text: '',
        ratings: []
      },
    },
    control: new FormControl('')
  }]

  authedUser: string = ''
  isAnswered: boolean = false

  constructor(
    private feedback: FeedbackDataService,
    private router: Router,
    private store: Store,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.feedback.getServices()
    const code = this.router.url.split('/megz/service/')[1]
    this.store.select(getServices).subscribe({
      next: services => {
        for (let service of services) {
          if (service.code.toString() === code) {
            this.service = service
            this.isLoading = false
          }
        }
        this.store.select(getUser).subscribe({
          next: data => {
            this.authedUser = data.userData.name
          }
        })
        this.service.questions.map(q => {
          if (q.option1.ratings.includes(this.authedUser) || q.option2.ratings.includes(this.authedUser) || q.option3.ratings.includes(this.authedUser)) {
            this.questions.filter(q => false)
            this.isAnswered = true
            this.toast.show('you sent this feedback!')
            return
          } else {
            this.questions.splice(0, this.questions.length)
            this.service.questions.forEach(item => {
              this.questions.push({
                question: {
                  question: item.question,
                  option1: {
                    text: item.option1.text,
                    ratings: []
                  },
                  option2: {
                    text: item.option2.text,
                    ratings: []
                  },
                  option3: {
                    text: item.option3.text,
                    ratings: []
                  },
                },
                control: new FormControl('', [Validators.required]),
              })
            })
          }
        })
      }
    })

  }

  getfeedbackError() {
    if (this.questions.filter(q => {
      q.control.hasError('required')
    })) {
      return `please select an answer!`
    }
    return `Unkonew error Please try again!`
  }

  sendFeedback = (event: Event) => {
    event.preventDefault()
    this.isLoading = true

    const check = this.questions.filter(q => q.control.hasError('required'))
    if (check.length > 0) {
      this.toast.show('please select a rating!')
      return
    } else {
      let ratings: string[] = []
      let user = ''

      this.store.select(getUser).subscribe({
        next: data => user = data.userData.name
      })
      this.questions.map(q => {
        ratings.push(q.control.value)
      })

      const body = {
        user,
        ratings,
        code: this.service.code,
      }
      this.feedback.addRating(body)
      .then(() => this.isLoading = true)
    }
  }
}
