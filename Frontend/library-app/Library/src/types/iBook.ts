export interface iBook {
    _id: string
  title: string
  author: string
  pdfLink: string
  genre: string
  avgRating: number
  image: string
}
export const defaultListBook: iBook[] = [
  {
    _id: '',
    title: '',
    author: "",
    pdfLink: "",
    genre: "",
    avgRating: 0,
    image: ""
  }
]

