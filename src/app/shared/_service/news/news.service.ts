import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  getNews(language:string, countries: string, tags: string, query: string, page: string, size: string): Observable < Object > {
    let params = {
      'languages': language,
      'page': page,
      'size': size
    };
    // if (countries) {
    //   params['countries'] = countries;
    // }
    if (tags) {
      params['tags'] = tags;
    }
    if(query) {
      params['query'] = query;
    }
    return this.http.get('/api/getNews',
      {
        headers: this.headers,
        params: params
      }
    );
  }

  getShortcutImgs(language:string): Observable < Object > {
    let params = {
      'language': language,
    };
    return this.http.get('/api/getTrendTags',
      {
        headers: this.headers,
        params: params
      }
    );
  }
}


