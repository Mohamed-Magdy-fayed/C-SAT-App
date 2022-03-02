import { FormControl, Validators } from '@angular/forms';
import { AdminToolService } from 'src/app/services/admin-tool.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.scss']
})
export class AddPersonnelComponent implements OnInit {
  personName = new FormControl('', [
    Validators.required
  ])

  question1 = new FormControl('', [
    Validators.required
  ])

  constructor(
    private admin: AdminToolService
  ) { }

  ngOnInit(): void {  }

  getError() {
    return 'please fill all required fileds!'
  }

}
