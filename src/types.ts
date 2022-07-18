export interface Meal {
  name: string,
  carbs: number,
  units: number,
  date: Date,
  id: string
  vote: {
    up: boolean,
    down: boolean
  }
}
