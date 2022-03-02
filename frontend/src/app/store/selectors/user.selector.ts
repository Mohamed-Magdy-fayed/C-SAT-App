import { UserState } from './../../interfaces/UserState';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectUser = createFeatureSelector<UserState>('User');

export const getUser = createSelector(
  selectUser,
  (user) => {
    return user
  }
)
