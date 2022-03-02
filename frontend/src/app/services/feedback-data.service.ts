import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackDataService {
  feedback: boolean | null = null

  constructor() { }

  setFeedback (feedback: boolean | null) {
    this.feedback = feedback
    console.log(this.feedback)
  }
}
