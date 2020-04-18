import { Component, OnInit, OnDestroy } from '@angular/core';
import { TagsService } from '../core/services/tags.service';
import { HomeService } from '../core/services/home.service';
import { HttpService } from '../core/services/http.service';
import { AuthService } from '../core/services/auth.service';
import { Router, Route } from '@angular/router';
import { ArticleService } from '../core/services/article.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  popularTags;
  listOfArticles;
  tag: string;
  tagSubscription: Subscription;

  config = {id: 'home',
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: 0
          };

  constructor(
    public tagsService: TagsService,
    public homeService: HomeService,
    public httpService: HttpService,
    public authService: AuthService,
    private router: Router,
    public articleService: ArticleService
  ) {}

  ngOnInit() {

    this.authService.getUserJWT();

    this.httpService.getTags().subscribe((res) => {
      this.popularTags = res.tags;
    });

    if (!this.authService.userJWT) {
      this.homeService.selected = 'Global Feed';
      this.fetchArticles(this.homeService.selected);
    } else {
      this.homeService.selected = 'Your Feed';
      this.fetchArticles(this.homeService.selected);
    }

    this.tagSubscription = this.tagsService.tagObservable.subscribe((res: string) => {
      this.tag = res;
      this.listOfArticles = undefined;
      this.config = undefined;
      this.httpService.getArticlesByTag(this.tag).subscribe((response) => {
        this.listOfArticles = response.articles;
        this.config = {
          id: 'home',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.listOfArticles.length
  };
      });
    });
  }

  select(section: string) {
    this.tag = '';

    if (section === 'Your Feed') {
      if (this.homeService.selected === 'Your Feed') {
        return;
      }
      this.authService.getUserJWT();
      if (this.authService.userJWT) {
        this.fetchArticles(section);
      } else {
        this.router.navigate(['/login']);
      }
    } else if (section === 'Global Feed') {
      if (this.homeService.selected === 'Global Feed') {
        return;
      }
      this.fetchArticles(section);
    }

    this.homeService.selected = section;
  }

  fetchArticles(selected) {
    this.listOfArticles = undefined;
    if (selected === 'Global Feed') {
      this.httpService.getGlobalFeed().subscribe((res) => {
        this.listOfArticles = res.articles;

        this.config = {
        id: 'home',
  itemsPerPage: 5,
  currentPage: 1,
  totalItems: this.listOfArticles.length
};

      });
    } else if (selected === 'Your Feed') {
      this.httpService.getUserFeed().subscribe((res) => {
        this.listOfArticles = res.articles;

        this.config = {
          id: 'home',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.listOfArticles.length
  };
      });
    }
  }

pageChanged(event) {
    this.config.currentPage = event;
  }

ngOnDestroy() {
    this.tagSubscription.unsubscribe();
  }
}
