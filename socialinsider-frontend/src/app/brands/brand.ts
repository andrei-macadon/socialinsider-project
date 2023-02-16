import { IProfile } from '../profiles/profile';

export interface IBrand {
  brandname: string;
  profiles: IProfile[];
}

export interface BrandPayload {
  id: number;
  error: null | undefined;
  result: IBrand[];
}
