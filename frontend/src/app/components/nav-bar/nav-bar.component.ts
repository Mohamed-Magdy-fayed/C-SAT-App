import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AdminToolService } from './../../services/admin-tool.service';
import { Component, Input, OnInit } from '@angular/core';
import { getUser } from 'src/app/store/selectors/user.selector';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  name: string = ''
  isLogged: boolean = false

  constructor(
    private admin: AdminToolService,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.select(getUser).subscribe(data => {
      this.name = data.userData.name
      this.isLogged = data.authed
    })
  }

  logout() {
    this.admin.logoutUser()
  }

  navigate(link: string) {
    this.router.navigate([`/${link}`])
  }
}
