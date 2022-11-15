import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Package,History } from '../models';

@Injectable()
export class PackageService {

  private url ='/api/package';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  
  constructor(private http: HttpClient) { }

  addPackage(newPackage: Package):Promise<any> {
    console.info(newPackage,"this is in addPackage method of packageSvc");
    
    let add = "/add";
    return lastValueFrom(
    this.http.post<any>(this.url+add,newPackage));
  }

  editPackage(updatedPackage: Package):Promise<any> {
    console.info(updatedPackage,"this is in editPackage method of packageSvc");
    
    const edit = "/edit";
    return lastValueFrom(
    this.http.put<any>(this.url+edit,updatedPackage));
  }

  getPackages(userId: number):Promise<Package[]> { 
    const url = `${this.url}/${userId}/`;
    return lastValueFrom(
    this.http.get<Package[]>(url,this.httpOptions));
  }

  getHistory(userId: number):Promise<History[]> { 
    const url = `${this.url}/history/${userId}/`;
    return lastValueFrom(
    this.http.get<History[]>(url,this.httpOptions));
  }

  getUniquePackage(uuid: string):Promise<Package> { 
    const url = `${this.url}/uniquepackage/${uuid}/`;
    return lastValueFrom(
    this.http.get<Package>(url,this.httpOptions));
  }

  usePass(uuid:string):Promise<any>{
    const url = `${this.url}/usepackage/`;
    console.info('url>>>>>>>>>>>>>'+url);
    let uuidJson = {'uuid': uuid};
    return lastValueFrom(
      this.http.put<any>(url,uuidJson,this.httpOptions));
  }

  deletePackage(uuid:string):Promise<any>{
    const url = `${this.url}/deletepackage/${uuid}/`;
    return lastValueFrom(
      this.http.delete<any>(url,this.httpOptions));
  }
}
