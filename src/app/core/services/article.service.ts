import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(public httpService: HttpService) { }

  favorite(article, favoritedStatus) {
    if (favoritedStatus) {
      this.httpService.favoriteArticle(article.slug)
      .subscribe(res => console.log(res));
    } else {
      this.httpService.unFavoriteArticle(article.slug)
      .subscribe(res => console.log(res));
    }
  }
}
