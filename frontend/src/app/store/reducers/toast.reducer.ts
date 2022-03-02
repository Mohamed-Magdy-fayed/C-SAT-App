import { showToast, hideToast } from './../actions/toast.action';
import { createReducer, on } from '@ngrx/store';

export const initialState = { msg: '', isShowen: false, isError: false }

export const toastReducer = createReducer(
  initialState,
  on(showToast, (state, { msg, isError }) => ({
    msg,
    isShowen: true,
    isError: isError ? isError : false
  })),
  on(hideToast, state => initialState)
)
