import { toastReducer } from './store/reducers/toast.reducer';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgMaterialModule } from './ng-materials/ng-material.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { HomeComponent } from './components/Home/Home.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { userReducer } from './store/reducers/user.reducer';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { AddPersonnelComponent } from './components/add-personnel/add-personnel.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ToastComponent } from './components/toast/toast.component';
import { serviceReducer } from './store/reducers/feedback.reducer';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.group('Store')
    console.log('action', action);
    console.log('state', state);
    console.groupEnd()
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  declarations: [
    AppComponent,
    FeedbackFormComponent,
    HomeComponent,
    AdminDashboardComponent,
    RegisterFormComponent,
    LoginFormComponent,
    NavBarComponent,
    AddServiceComponent,
    AddPersonnelComponent,
    MainComponent,
    NotFoundComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      User: userReducer,
      Toast: toastReducer,
      Service: serviceReducer,
    }, { metaReducers })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
