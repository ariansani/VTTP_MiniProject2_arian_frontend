import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { UserLogin, UserRegister } from '../models';
import { StorageService } from './storage.service';

@Injectable()
export class LoginService {

  private url ='/api/auth';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private loggedIn = new BehaviorSubject<boolean>(false);
  
  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
    }

  constructor(private http:HttpClient, private storageSvc:StorageService) { }

  login(userLogin: UserLogin):Promise<any> { 
    const url = `${this.url}/signin`;
    this.loggedIn.next(true);
    return lastValueFrom(
      this.http.post<any>(url,userLogin,this.httpOptions));
  }

  register(userRegister: UserRegister):Promise<any> {
    const url = `${this.url}/signup`;
    return lastValueFrom(
      this.http.post<any>(url,userRegister,this.httpOptions));

  }

  logout(): Observable<any> {
    const url = `${this.url}/signout`;
    this.loggedIn.next(false);
    this.storageSvc.clean();
    return this.http.post(url, { }, this.httpOptions);
  }


}
