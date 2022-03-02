import { selectToast } from './../../store/selectors/toast.selector';
import { Store } from '@ngrx/store';
import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  toastData = {
    msg: '',
    isShowen: false,
    isError: false
  }

  constructor(
    private toast: ToastService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.select(selectToast).subscribe((data) => {
      if (data) {
        this.toastData = data
      }
    })
  }

  setToastData(data: { msg: string, isShowen: boolean }) {
    this.toastData.msg = data.msg
    this.toastData.isShowen = data.isShowen
  }

  close() {
    this.toast.hide()
  }
}
