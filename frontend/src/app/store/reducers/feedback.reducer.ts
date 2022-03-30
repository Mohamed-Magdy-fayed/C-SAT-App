import { addService, removeService, setServices } from './../actions/feedback.action';
import { createReducer, on } from '@ngrx/store';
import { Service } from 'src/app/interfaces/Service';
import { state } from '@angular/animations';

export const initialState: Service[] = []

export const serviceReducer = createReducer(
  initialState,
  on(addService, (state, { service }) => ({
    ...state,
    service,
  })),
  on(removeService, (state, { code }) => state.filter(i => i.code !== code)),
  on(setServices, (state, { services }) => services)
)
