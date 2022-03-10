import { FormControl } from '@angular/forms';

export interface Input {
  id: number,
  isError: boolean,
  controls: {
    question: FormControl,
    option1: FormControl,
    option2: FormControl,
    option3: FormControl,
  }
}
