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
  role?: Role | null
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

declare interface PostOrderBy {
  date_created: Sort
  date_updated: Sort
  likes: Sort
  shares: Sort
  title: Sort
  views: Sort
}

declare enum IncrementType {
  LIKE,
  SHARE,
  VIEW
}

enum Role {
  ADMIN,
  AUTHOR
}

enum Sort {
  asc,
  desc
}