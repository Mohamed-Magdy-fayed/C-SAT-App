import { ToastService } from './../../services/toast.service';
import { FeedbackDataService } from './../../services/feedback-data.service';
import { getServices } from './../../store/selectors/feedback.selector';
import { getUser } from '../../store/selectors/user.selector';
import { Store } from '@ngrx/store';
import { AdminToolService } from '../../services/admin-tool.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent implements OnInit {
  code = new FormControl('', [
    Validators.required
  ])

  constructor(
    private router: Router,
    private feedback: FeedbackDataService,
    private store: Store,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.feedback.getServices()
   }

  getCodeError () {
    if (this.code.hasError('required')) {
      return 'please enter the code'
    }
    return
  }

  startFeedback (event: Event) {
    event.preventDefault()
    console.log(`ll`);


    this.store.select(getServices).subscribe({
      next: services => {
        const match = services.filter(service => service.code == this.code.value)
        if (match.length > 0) {
          this.router.navigate([`/megz/service/${this.code.value}`])
        } else {
          this.toast.show('Invalid service code, Please try again!')
        }
      }
    })
  }
}
