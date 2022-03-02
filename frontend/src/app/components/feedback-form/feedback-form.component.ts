import { Router } from '@angular/router';
import { FeedbackDataService } from './../../services/feedback-data.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
  feedback = new FormControl(null, [
    Validators.required
  ])

  constructor(
    private feedbackData: FeedbackDataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  getfeedbackError() {
    if (this.feedback.hasError('required')) {
      return 'Please select a feedback rating'
    }
    return
  }

  setFeedback (input: string) {
    switch (input) {
      case 'one':
        return this.feedbackData.setFeedback(false)
      case 'two':
        return this.feedbackData.setFeedback(null)
      case 'three':
        return this.feedbackData.setFeedback(true)
      default:
        return
    }
  }

  sendFeedback(event: Event) {
    event.preventDefault()
    if (this.feedback.hasError('required')) {
      this.getfeedbackError()
      return
    } else {
      this.setFeedback(this.feedback.value)
    }
  }
}
