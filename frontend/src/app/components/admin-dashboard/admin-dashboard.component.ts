import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AdminToolService } from 'src/app/services/admin-tool.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  link = new FormControl('', [
    Validators.required
  ])
  response: any

  constructor(
    private admin: AdminToolService,
  ) { }

  ngOnInit(): void {  }

  update () {
    this.response = {message: 'done'}
  }
}
