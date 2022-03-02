import { ToastService } from './../../services/toast.service';
import { getUser } from 'src/app/store/selectors/user.selector';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AdminToolService } from 'src/app/services/admin-tool.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private admin: AdminToolService,
    private router: Router,
    private store: Store,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.admin.checkAuth()
  }
}
