import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectToast = createFeatureSelector<{ msg: string, isShowen: boolean, isError: boolean }>('Toast');

export const getToast = createSelector(
  selectToast,
  (toast) => {
    return toast
  }
)
