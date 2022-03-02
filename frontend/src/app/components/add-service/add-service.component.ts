import { AdminToolService } from 'src/app/services/admin-tool.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {

  constructor(
    private admin: AdminToolService
  ) { }

  ngOnInit(): void {  }

}
