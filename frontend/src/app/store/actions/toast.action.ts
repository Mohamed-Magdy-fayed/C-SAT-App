import { createAction, props } from '@ngrx/store';

export const showToast = createAction(
  '[Toast] Show Toast',
  props<{ msg: string, isError?: boolean }>()
)

export const hideToast = createAction(
  '[Toast] Hide Toast'
)

