import { ToastService } from './../../services/toast.service';
import { Input } from '../../interfaces/Input';
import { Store } from '@ngrx/store';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { addService } from 'src/app/store/actions/feedback.action';
import { FeedbackDataService } from 'src/app/services/feedback-data.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  name = new FormControl('', [
    Validators.required
  ])
  code = new FormControl('', [
    Validators.required
  ])
  inputs: Array<Input> = []
  isError: boolean = false

  constructor(
    private toast: ToastService,
    private feedback: FeedbackDataService,
  ) { }

  ngOnInit(): void { }

  resetForm() {
    this.name.reset()
    this.name.setErrors(null)
    this.code.reset()
    this.code.setErrors(null)
    this.inputs = []
  }

  addField() {
    const feedback = {
      id: this.inputs.length + 1,
      isError: false,
      controls: {
        question: new FormControl('', [
          Validators.required
        ]),
        option1: new FormControl('', [
          Validators.required
        ]),
        option2: new FormControl('', [
          Validators.required
        ]),
        option3: new FormControl('', [
          Validators.required
        ]),
      }
    }
    this.inputs.push(feedback)
  }

  RemoveField(index: number) {
    this.inputs.splice(index - 1, 1)
  }

  handleSubmit(e: Event) {
    e.preventDefault()

    let check
    const isNum = /^[0-9\b]+$/
    this.inputs.forEach(input => {
      if (input.controls.question.hasError('required') ||
        input.controls.option1.hasError('required') ||
        input.controls.option2.hasError('required') ||
        input.controls.option3.hasError('required')) {
        check = false
      }
    })

    if (this.name.hasError('required') || this.code.hasError('required') || !isNum.test(this.code.value) || check === false) {
      !isNum.test(this.code.value) ?
        this.toast.show('Invalid Code!')
        : this.toast.show('Please fill all the fields!')
      return
    }

    let questions: any = []

    this.inputs.map(input => {
      const question = {
        question: input.controls.question.value,
        option1: {
          text: input.controls.option1.value,
          ratings: [],
        },
        option2: {
          text: input.controls.option2.value,
          ratings: [],
        },
        option3: {
          text: input.controls.option3.value,
          ratings: [],
        },
      }
      questions.push(question)
    })
    const service = {
      name: this.name.value,
      code: this.code.value,
      rating: 0,
      questions,
    }
    this.resetForm()
    this.toast.show('Service Added!')
    this.feedback.saveService(service)
  }
}
