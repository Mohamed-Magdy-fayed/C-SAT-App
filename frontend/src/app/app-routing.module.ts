import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainComponent } from './components/main/main.component';
import { AddPersonnelComponent } from './components/add-personnel/add-personnel.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { HomeComponent } from './components/Home/Home.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/megz/login', pathMatch: 'full' },
  { path: '*', component: NotFoundComponent },
  {
    path: 'megz', component: MainComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'service/:code', component: FeedbackFormComponent },
      { path: 'admin', pathMatch: 'full', component: AdminDashboardComponent },
      { path: 'login', component: LoginFormComponent },
      { path: 'register', component: RegisterFormComponent },
      { path: 'add/service', component: AddServiceComponent },
      { path: 'add/personnel', component: AddPersonnelComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
