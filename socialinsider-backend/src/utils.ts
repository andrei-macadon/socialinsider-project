export const API_URL = 'https://app.socialinsider.io/api'

export const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer API_KEY_TEST',
}

export interface IProfile {
  name: string
  profile_added: Date
  id: string
  profile_type: string
}

export interface IBrand {
  brandname: string
  profiles: IProfile[]
}

export interface IPost {
  id: string
  caption: string
  picture: string
  permalink: string
  engagement: number
  type: string
  date: Date
}

export class Post {
  post: IPost | undefined
  profile_id: string | undefined
  profile_type: string | undefined

  constructor(post?: IPost, profile_id?: string, profile_type?: string) {
    this.post = post || undefined
    this.profile_id = profile_id || ''
    this.profile_type = profile_type || ''
  }
}

export interface PostsPayload {
  id: number
  error: null | undefined
  resp: {
    returned: number
    total: number
    from: number
    size: number
    posts: IPost[]
  }
}

export class MyDate {
  start: number
  end: number
  timezone: string

  constructor(start?: number, end?: number, timezone?: string) {
    this.start = start || 0
    this.end = end || 0
    this.timezone = timezone || 'Europe/London'
  }
}

export class PostsRequestParams {
  id: string
  profile_type: string
  date: MyDate
  from: number
  size: number

  constructor(
    id?: string,
    profile_type?: string,
    date?: MyDate,
    from?: number,
    size?: number
  ) {
    this.id = id || '0'
    this.profile_type = profile_type || 'none'
    this.date = date || new MyDate()
    this.from = from || 0
    this.size = size || 10
  }
}

export class SIRequest {
  jsonrpc: string
  id: number
  method: string
  params: PostsRequestParams

  constructor(
    jsonrpc?: string,
    id?: number,
    method?: string,
    params?: PostsRequestParams
  ) {
    this.jsonrpc = jsonrpc || '2.0'
    this.id = id || 0
    this.method = method || 'socialinsider_api.get_posts'
    this.params = params || new PostsRequestParams()
  }
}

export class PostsRequestPayload {
  siRequest: SIRequest
  brand: IBrand | null

  constructor(siRequest?: SIRequest, brand?: IBrand) {
    this.siRequest = siRequest || new SIRequest()
    this.brand = brand || null
  }
}

export class PayloadResponseCombined {
  totalNoOfPosts: number | undefined
  posts: Post[] | undefined

  constructor(totalNoOfPosts?: number, posts?: Post[]) {
    this.totalNoOfPosts = totalNoOfPosts || 0
    this.posts = posts || []
  }
}
