import { IUser } from './user.interface';

export interface IComment {
  id: number;
  text: string;
  createdAt: Date;
}

export interface ICommentResponse extends IComment {
  user: IUser;
}

export type CreateComment = Omit<IComment, 'id' | 'createdAt'>;
