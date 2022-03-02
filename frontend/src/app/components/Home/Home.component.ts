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
    private admin: AdminToolService,
    private store: Store,
  ) { }

  ngOnInit(): void {  }

  getCodeError () {
    if (this.code.hasError('required')) {
      return 'please enter the code'
    }
    return
  }

  startFeedback (event: Event) {
    event.preventDefault()

    console.log(this.code.value);

    this.router.navigate([`/megz/service/${this.code.value}`])
  }
}
