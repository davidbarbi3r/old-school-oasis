export interface IGame {
  id: number
  name: string
  description: string
  platforms: string[]
  company: string
  genres: string[]
  release_date: Date
  rating: number
  cover: string
}
