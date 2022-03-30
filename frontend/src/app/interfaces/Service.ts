export interface Question {
  question: string,
  option1: {
    text: string,
    ratings: string[],
  },
  option2: {
    text: string,
    ratings: string[],
  },
  option3: {
    text: string,
    ratings: string[],
  },
}

export interface Service {
  name: string,
  code: number,
  rating: number,
  questions: Question[]
}
