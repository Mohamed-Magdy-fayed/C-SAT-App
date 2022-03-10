import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Service } from 'src/app/interfaces/Service';

export const selectService = createFeatureSelector<Service[]>('Service');

export const getServices = createSelector(
  selectService,
  (services) => {
    return services
  }
)
