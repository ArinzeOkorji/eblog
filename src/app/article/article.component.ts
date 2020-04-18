import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../core/services/http.service';
import { ArticleService } from '../core/services/article.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article;
  favoriteStatus;

  constructor(private route: ActivatedRoute,
              private httpServie: HttpService,
              public articleService: ArticleService,
              public authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      const params = param.slug;
      this.httpServie.getSingleArticle(params)
      .subscribe(res => {
        this.article = res.article;
        console.log(this.article)
        /* if (this.article.hasOwnProperty('favoritedBy')) {
          if(this.article.favoritedBy.includes(this.authService.userName)) {
            this.favoriteStatus = true;
          } else {
            this.favoriteStatus = false;
          }
        } else {
          this.favoriteStatus = false;
        } */
        if (this.article.favorited) {
          this.favoriteStatus = true;
        } else {
          this.favoriteStatus = false;
        }
      });
    });
  }

  toggleFavorite(article) {
    this.favoriteStatus = !this.favoriteStatus;
    this.articleService.favorite(article, this.favoriteStatus);
  }

}
