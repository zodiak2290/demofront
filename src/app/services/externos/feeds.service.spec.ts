import { TestBed } from '@angular/core/testing';

import { FeedsService } from './feeds.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, HttpParams, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { of } from 'rxjs';

describe('FeedsService', () => {
  let service: FeedsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(FeedsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch news from VUE', () => {
    const mockResponse = { title: 'Test News',
      description: "string",
      enableGlobalSettings: true,
      feedUrl: "string",
      generator: "string",
      id: "string",
      imageUrl: "string",
      items: [],
      lastBuildDate: "string",
      settings: "string",
      siteUrl: "string",
      tags: []
     };
    const http = TestBed.inject(HttpClient);
    const httpMock = TestBed.inject(HttpClient);

    spyOn(httpMock, 'get').and.returnValue(of(mockResponse));

    service.getNewsVUE().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpMock.get).toHaveBeenCalledWith("https://rss.app/feeds/hmsyAr3PyniBpmOd.json");
  });

  it('should fetch market data with params', () => {
    const mockResponse = { data: 'Market Data' };
    const params = new HttpParams().set('access_key', 'test_key');
    const http = TestBed.inject(HttpClient);
    const httpMock = TestBed.inject(HttpClient);

    spyOn(httpMock, 'get').and.returnValue(of(mockResponse));

    service.getMarket(params).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpMock.get).toHaveBeenCalledWith("http://api.marketstack.com/v1/eod", { params });
  });
});
