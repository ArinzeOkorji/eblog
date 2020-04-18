import { Component, OnInit } from '@angular/core';
import { HttpService } from '../core/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../core/article';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
titleText;
descriptionText;
bodyText;
tagsText;
  param: any;

  constructor(public httpService: HttpService,
              public route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.param = res.slug;
      if (this.param) {
        this.httpService.getSingleArticle(this.param)
        .subscribe(response => {
          const article: Article = response.article;
          this.titleText = article.title;
          this.descriptionText = article.description;
          this.bodyText = article.body;
          this.tagsText = article.tagList.join(', ');
        });
      }
    });
  }

  submit(form) {
    console.log(form)
    let tags;
    if (form.value.tags) {
      tags = form.value.tags.split(',');
      form.value.tags = tags.map(element => {
      if (element[0] === ' ') {
        return element = element.slice(1);
      }
      return element;
    });
    }

    if (this.param) {
      this.httpService.updateArticle(form.value, this.param)
    .subscribe(res => {
      if (res) {
        console.log(res);
        this.router.navigate(['/']);
      }
    });
      this.router.navigate(['/']);
    } else {
      this.httpService.createArticle(form.value)
    .subscribe(res => {
      if (res) {
        console.log(res);
        this.router.navigate(['/']);
      }
    });
    }
  }

}
