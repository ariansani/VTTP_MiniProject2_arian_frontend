import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Package } from '../models';

@Injectable()
export class WeatherService {

  private url ='/api/weather/';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  
  constructor(private http: HttpClient) { }

  getWeather(gymId: number):Promise<any> {

    
    return lastValueFrom(
    this.http.get<any>(this.url+gymId,this.httpOptions));
  }

}
