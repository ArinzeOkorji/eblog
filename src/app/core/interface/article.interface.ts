export interface IArticle {
  tagList: string[];
    createdAt: string;
    author: {
      image: string,
      following: boolean;
      bio: string,
      username: string,
    };
    description: string;
    title: string;
    body: string;
    favoritesCount: number;
    slug: string;
    updatedAt: string;
    favorited: boolean;
}

export interface IArticlesList {
  articles: IArticle[];
}
