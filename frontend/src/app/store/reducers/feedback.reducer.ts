import { addService, removeService, setServices } from './../actions/feedback.action';
import { createReducer, on } from '@ngrx/store';
import { Service } from 'src/app/interfaces/Service';

export const initialState: Service[] = []

export const serviceReducer = createReducer(
  initialState,
  on(addService, (state, { service }) => ({
    ...state,
    service,
  })),
  on(removeService, (state, { code }) => {
    const index = state.findIndex(service => service.code === code)
    return ({
      ...state.splice(index, 1)
    })
  }),
  on(setServices, (state, { services }) => services)
)
