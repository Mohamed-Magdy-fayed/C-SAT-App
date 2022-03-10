import { createAction, props } from '@ngrx/store';
import { Service } from 'src/app/interfaces/Service';

export const addService = createAction(
  '[Service] Add Service',
  props<{ service: Service }>()
)

export const removeService = createAction(
  '[Service] Remove Service',
  props<{ code: number }>()
)

export const setServices = createAction(
  '[Service] Set Services',
  props<{ services: Service[] }>()
)
