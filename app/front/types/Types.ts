
export interface Article {
    id_article: string,
    title: string,
    content: string,
    image: string,
    creation_date: string,
    modification_date: string,
    user?: { id_user: string, username: string },
    categories?: ArticleCategory
}

export interface Category {
  id_category: number;
  name: string;
  article_categories?: ArticleCategory[];
  created_categories?: CreatedCategory[];
}

export interface ArticleCategory {
  id_article: number;
  id_category: number;
  article?: Article;
  category?: Category;
}

export interface CreatedCategory {
  id_user: number;
  id_category: number;
  user?: User;
  category?: Category;
}


export interface User {
    id_user: string;
    username: string;
    bio?: string;
    mail: string;
    password: string;
    profile_picture?: string;
    id_role: string;
    social_networks: { name: string; link?: string }[];
}

export interface Comments {
  id_comment: number;
  content: string;
  creation_date: Date;
  id_user: number;
  id_article: number;
  user?: User;
  article?: Article;
}

export interface Notifications {
    id_notification: string;
    type: string;
    message?: string;
    notification_date: Date;
    read_status: boolean;
    id_user: string;
  }
  
  export interface UserLike {
    id_user: string;
    id_like: string;
  }

  export interface Like {
    id_like: string;
    like_date: Date;
    id_article: string;
  }