import { IBrand } from '../brands/brand';

export interface IPost {
  id: string;
  caption: string;
  picture: string;
  permalink: string;
  engagement: number;
  type: string;
}

export class Post {
  post: IPost | undefined;
  profile_id: string | undefined;
  profile_type: string | undefined;

  constructor(post?: IPost, profile_id?: string, profile_type?: string) {
    this.post = post || undefined;
    this.profile_id = profile_id || '';
    this.profile_type = profile_type || '';
  }
}

export class MyDate {
  start: number;
  end: number;
  timezone: string;

  constructor(start?: number, end?: number, timezone?: string) {
    this.start = start || 0;
    this.end = end || 0;
    this.timezone = timezone || 'Europe/London';
  }
}

export class PostsRequestParams {
  id: string;
  profile_type: string;
  date: MyDate;
  from: number;
  size: number;

  constructor(
    id?: string,
    profile_type?: string,
    date?: MyDate,
    from?: number,
    size?: number
  ) {
    this.id = id || '0';
    this.profile_type = profile_type || 'none';
    this.date = date || new MyDate();
    this.from = from || 0;
    this.size = size || 10;
  }
}

export class SIRequest {
  jsonrpc: string;
  id: number;
  method: string;
  params: PostsRequestParams;

  constructor(
    jsonrpc?: string,
    id?: number,
    method?: string,
    params?: PostsRequestParams
  ) {
    this.jsonrpc = jsonrpc || '2.0';
    this.id = id || 0;
    this.method = method || 'socialinsider_api.get_posts';
    this.params = params || new PostsRequestParams();
  }
}

export class PostsRequestPayload {
  siRequest: SIRequest;
  brand: IBrand | null;

  constructor(siRequest?: SIRequest, brand?: IBrand) {
    this.siRequest = siRequest || new SIRequest();
    this.brand = brand || null;
  }
}

export interface PostsResponsePayload {
  totalNoOfPosts: number;
  posts: Post[];
}
