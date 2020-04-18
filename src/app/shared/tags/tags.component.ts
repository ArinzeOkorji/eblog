import { Component, OnInit, Input, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { TagsService } from 'src/app/core/services/tags.service';
import { HomeService } from 'src/app/core/services/home.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, AfterViewInit {
  @ViewChildren('li') li: QueryList<any>;
  @Input() tags;
  @Input() isPopularTag = false;

  constructor(public tagsService: TagsService, public homeService: HomeService) { }

  ngOnInit() {

    /* if (this.isPopularTag) {
      this.li.nativeElement.style.cursor = 'pointer';
    }
    console.log(this.li); */
  }

  ngAfterViewInit() {
    if (this.isPopularTag) {
      // let listOfTags;
     /* this.li.changes.subscribe(res => {
       console.log(res)
       res.forEach(element => {
         console.log(element)
        element.nativeElement.style.cursor = 'pointer';
       });
     }); */
     /* setTimeout(() => {
     listOfTags = this.li._results;
     listOfTags.forEach(element => {
      element.nativeElement.style.cursor = 'pointer';
    });
     }, 1000); */
  }
  }

  showFeedsForThisTag(tag: string) {
    if (this.isPopularTag) {
      this.tagsService.selectTag(tag);
      this.homeService.selected = '';
    }
  }
}
