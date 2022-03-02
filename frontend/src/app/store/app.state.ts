import { UserData } from './../interfaces/User';

export interface AppState {
  user: UserData,
  toast: {
    msg: string,
    isShowen: boolean
  }
}
