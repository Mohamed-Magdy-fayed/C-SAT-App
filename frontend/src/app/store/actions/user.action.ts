import { createAction, props } from '@ngrx/store';
import { UserData } from './../../interfaces/User';

export const loginUser = createAction(
  '[User] Login User',
  props<{ user: UserData }>()
)

export const logoutUser = createAction(
  '[User] Logout User'
)

