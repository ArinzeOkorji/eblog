import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  tagObservable = new Subject();

  constructor() { }

  selectTag(tag) {
    this.tagObservable.next(tag);
  }
}
