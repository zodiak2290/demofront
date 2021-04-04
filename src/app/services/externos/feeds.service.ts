import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FeedVue } from '../../modelos/FeedVue/feed-vue';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {

  constructor(private http: HttpClient) { }

  getNewsVUE() {
    return this.http.get<FeedVue>("https://rss.app/feeds/hmsyAr3PyniBpmOd.json");
  }

  getMarket(params?: HttpParams) {
    return this.http.get<any>("http://api.marketstack.com/v1/eod", {params});
  }
}
