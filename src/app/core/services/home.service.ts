import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  selected = 'Global Feed';
  constructor(private httpService: HttpService) { }
}
