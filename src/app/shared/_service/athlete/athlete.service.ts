import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  private headers = new HttpHeaders();


  constructor(private http: HttpClient) { }

  setAthlete(athlete) {
    return this.http.post(
      '/api/setAthlete',
      athlete,
      { headers: this.headers }).pipe(map(response => {
        return response;
      }));
  }

}
