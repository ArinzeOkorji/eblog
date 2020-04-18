import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from 'src/app/core/services/article.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.scss']
})
export class SingleArticleComponent implements OnInit {
  @Input() article;
  favoriteStatus;

  constructor(public articleService: ArticleService,
              public authService: AuthService,
              public httpService: HttpService,
              public profileService: ProfileService,
              private router: Router) { }

  ngOnInit() {
    /* if (this.article.hasOwnProperty('favoritedBy')) {
      console.log('yes')
      if(this.article.favoritedBy.includes(this.authService.userName)) {
        this.favoriteStatus = true;
        console.log('yes again')
      } else {
        this.favoriteStatus = false;
        console.log('no')
      }
    } else {
      this.favoriteStatus = false;
      console.log('no again')
    }console.log(this.article) */
    if (this.article.favorited) {
      this.favoriteStatus = true;
    } else {
      this.favoriteStatus = false;
    }
  }

  toggleFavorite(article) {
    this.favoriteStatus = !this.favoriteStatus;
    this.articleService.favorite(article, this.favoriteStatus);
  }

  deleteArticle(slug) {
    this.httpService.deleteArticle(slug)
    .subscribe(res => res);
  }

  goToProfile(username: string) {
    this.profileService.userName.next(username);
    this.router.navigate([`/profile/${username}`]);
  }

}
