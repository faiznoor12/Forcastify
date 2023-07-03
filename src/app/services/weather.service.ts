import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { List, allForcast } from '../models/forcast.model';
import { weather } from '../models/weather.model';
import { location } from '../models/location.model';
import { Data } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  locationUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?';
  weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?';
  forcastUrl = 'http://api.openweathermap.org/data/2.5/forecast?';
  api = environment.api
  Key = environment.Key

  constructor(private http: HttpClient) {}

  getLocation(input: string):Observable<location> {
    return this.http.get<location>(this.locationUrl, {
      headers: {
        'X-RapidAPI-Key': this.Key,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      },

      params: {
        minPopulation: 10000,
        namePrefix: input,
      },
    })
  }

  getCurrent(lat: any, lon: any):Observable<weather> {
    return this.http.get<weather>(this.weatherUrl, {
      params: {
        appid: this.api,
        units: 'metric',
        lat: lat,
        lon: lon,
      },
    });
  }
  getForcast(lat: any, lon: any): Observable<List[]> {
    return this.http
      .get<allForcast>(this.forcastUrl, {
        params: {
          appid: this.api,
          units: 'metric',
          lat: lat,
          lon: lon,
        },
      })
      .pipe(map((res) => res.list));
  }
}
