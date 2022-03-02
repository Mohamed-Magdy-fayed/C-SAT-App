import { UserState } from './../../interfaces/UserState';
import { loginUser, logoutUser } from './../actions/user.action';
import { createReducer, on } from '@ngrx/store';

export const initialState: UserState = {
  userData: {
    name: '',
    email: '',
    password: '',
  }, authed: false
}

export const userReducer = createReducer(
  initialState,
  on(loginUser, (state, { user }) => ({
    userData: user,
    authed: true,
  })),
  on(logoutUser, (state) => initialState)
)
