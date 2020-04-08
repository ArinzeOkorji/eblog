import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
popularTags = [
  'War',
  'Farmine',
  'Disease',
  'Drought'
];

articleTags = [
  'Virus',
  'COVID-19',
];
  constructor() { }

  ngOnInit() {
  }

}
