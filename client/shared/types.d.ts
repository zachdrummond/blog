declare interface AuthPayload {
  token: string
  author: Author
}

declare interface Author {
  author_id: number
  date_created: string
  date_updated: string
  posts?: [Post]
  username: string
  email?: string | null
  password?: string | null
  first_name?: string | null
  last_name?: string | null
  role?: 'ADMIN' | 'AUTHOR' | null
}

declare interface Feed {
  total: number
  items: [Post]
}

declare interface Post {
  post_id: number
  author_id: number
  author: Author
  categories: [string]
  content: string
  date_created: string
  date_updated: string
  likes?: number
  published: boolean
  shares?: number
  title: string
  views?: number
}