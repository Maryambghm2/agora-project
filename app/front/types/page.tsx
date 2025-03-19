
export interface Article {
  _count: any;
  id_article: number;
  title: string;
  content: string;
  image?: string;
  creation_date: Date;
  modification_date?: Date;
  author: string;
  author_id: string;
  user: { userId: number; username: string };
  categoryId: number;
  category?: Category;
  comments?: Comment[];
  likes?: Like[];
  collections?: Collection[];
}

export interface Category {
  id_category: number;
  name: string;
  user: Users;
  articles?: Article[];
}

export interface Users {
  id_user: number;
  username: string;
  bio?: string;
  mail: string;
  password: string;
  profile_picture?: string;
  role: Role;
  social_networks?: SocialNetwork[];
  articles?: Article[];
  comments?: Comment[];
  user_likes?: UserLike[];
  notifications?: Notification[];
  collections?: Collection[];
  categories?: Category[];
}

export interface CustomUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
}
export interface Role {
  id_role: number;
  name: string;
  users?: Users[];
  permissions_roles?: PermissionsRole[];
}

export interface PermissionsRole {
  id_role: number;
  id_permission: number;
  role?: Role;
  permission?: Permission;
}

export interface Permission {
  id_permission: number;
  name: string;
  write_permission: boolean;
  read_permission: boolean;
  permissions_roles?: PermissionsRole[];
}

export interface SocialNetwork {
  id_network: number;
  name: string;
  link?: string;
  userId: number;
}

export interface Comment {
  id_comment: number;
  content: string;
  creation_date: Date;
  user: Users;
  article: Article;
}

export interface AddCommentProps {
  articleId: string;
  categoryId: string;
  onCommentAdded: () => void;
}



export interface Notifications {
  id_notification: number;
  type: string;
  message?: string;
  notification_date: Date;
  read_status: boolean;
  user: Users;
}

export interface Like {
  id_like: number;
  like_date: Date;
  article: Article;
  user_likes?: UserLike[];
}

export interface UserLike {
  id_user: number;
  id_like: number;
  user?: Users;
  like?: Like;
}

export interface Collection {
  id_user: number;
  id_article: number;
  user: Users;
  article: Article;
}

export interface AddCollectionProps {
  articleId: number;
  userId: number;
  categoryId: number;
  isInCollection: boolean;
}

export default function Home() {
  return;
}