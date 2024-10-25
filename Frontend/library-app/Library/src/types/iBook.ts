export interface iBook {
    _id: string
  title: string
  author: string
  pdfLink: string
  genre: string
  avgRating: number
  image: string
  contents:iBookContent[]
}

export interface iBookContent {
    _id: string
    content: string
    page: number
}


