import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const USER_KEY = 'auth-user';
const USER_ID = 'user-id';
const USER_NAME = 'user-name';
const USER_EMAIL = 'user-email';

@Injectable()
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }


  public saveUserName(name: string): void{
    window.sessionStorage.removeItem(USER_NAME);
    window.sessionStorage.setItem(USER_NAME, name);
  }

 
  public getUserName(): any{
    const name = window.sessionStorage.getItem(USER_NAME);
    return name;
  }

  public getUserId(): any {
    const id = window.sessionStorage.getItem(USER_ID);
    return id;
  }

  public saveUserId(id: any): void{
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, id);
  }

  public getUserEmail(): any {
    const email = window.sessionStorage.getItem(USER_EMAIL);
    return email;
  }

  public saveUserEmail(email: string): void{
    window.sessionStorage.removeItem(USER_EMAIL);
    window.sessionStorage.setItem(USER_EMAIL, email);
  }

  


 
}