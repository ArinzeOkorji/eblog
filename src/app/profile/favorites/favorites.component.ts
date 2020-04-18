import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  listOfArticles;

  config = {
    id: 'articles',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  };

  constructor(public httpService: HttpService, private route: ActivatedRoute) { }

  ngOnInit() {
    let username: string;
    this.route.params.subscribe(
      res => {
        username = res.username;
        this.httpService.getUserFavoriteArticles(username)
    .subscribe(response => {
      this.listOfArticles = response.articles;
      this.config = {
        id: 'favorites',
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.listOfArticles.length
      };
    });
      }
    );
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

}
