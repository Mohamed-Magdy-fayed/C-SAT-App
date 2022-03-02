import { getToast } from './../store/selectors/toast.selector';
import { showToast, hideToast } from './../store/actions/toast.action';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastMessage = {
    msg: '',
    isShowen: false
  }
  isShowen: boolean = true

  constructor(
    private store: Store
  ) { }

  show(msg: string, isError?: boolean) {
    this.store.dispatch(showToast({ msg, isError }))
    setTimeout(() => {
      this.store.dispatch(hideToast())
    }, 5000);
  }

  hide() {
    this.store.dispatch(hideToast())
  }
}
