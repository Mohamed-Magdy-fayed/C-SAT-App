import { Input } from '../interfaces/Input';
import { Service } from '../interfaces/Service';
import { UserData } from './../interfaces/User';

export interface AppState {
  user: UserData,
  toast: {
    msg: string,
    isShowen: boolean
  },
  services: Service[]
}
