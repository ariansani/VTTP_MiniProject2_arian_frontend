import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Gym } from '../models';

@Injectable()
export class GymService {

  private url ='/api/gym';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getGyms():Promise<Gym[]> { 
    const url = `${this.url}/gyms`;
    return lastValueFrom(
    this.http.get<Gym[]>(url,this.httpOptions));
  }

  getGym(id:number):Promise<Gym> { 
    const url = `${this.url}/${id}`;
    return lastValueFrom(
    this.http.get<Gym>(url,this.httpOptions));
  }


}
