import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/core/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  listOfArticles;

  config = {
    id: 'articles',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  };

  constructor(public httpService: HttpService,
              private route: ActivatedRoute,
              public articleService: ArticleService) { }

  ngOnInit() {
    let username: string;
    this.route.params.subscribe(
      res => {
        username = res.username;
        this.httpService.getUserArticles(username)
    .subscribe(res => {
      this.listOfArticles = res.articles;

      this.config = {
        id: 'articles',
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.listOfArticles.length
      };
    });
      }
    );
  }

  toggleFavorite(slug: string, favorited: boolean) {
    this.articleService.favorite(slug, favorited);
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

}
