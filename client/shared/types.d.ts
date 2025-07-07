declare interface Post {
  post_id: number,
  author_id: number,
  categories: [string]
  content: string
  date_created: string
  date_updated: string
  likes: number
  published: boolean
  shares: number
  title: string
  views: number
}