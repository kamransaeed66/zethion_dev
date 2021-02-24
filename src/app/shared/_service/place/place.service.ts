import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {


  private headers = new HttpHeaders();
  public opts = [];


  constructor(private http: HttpClient) { }

  getPlaces(val: string) {
    return this.http.get<any>('/api/getPlaces',
        {
          headers: this.headers,
          params: {
            'place': val,
            'language': sessionStorage.getItem('language')
          }
        }
      ).pipe(tap(data => this.opts = data));
  }

  getPlaceByCoordinates(latitude: string, longitude: string): Observable < Object > {
    return this.http.get<any>('/api/getPlaceByCoordinates',
      {
        headers: this.headers,
        params: {
          'latitude': latitude,
          'longitude': longitude
        }
      }
    );
  }

}
