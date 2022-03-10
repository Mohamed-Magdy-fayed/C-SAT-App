export interface Question {
  question: string,
  option1: string,
  option2: string,
  option3: string,
}

export interface Service {
  name: string,
  code: number,
  questions: Question[]
}
