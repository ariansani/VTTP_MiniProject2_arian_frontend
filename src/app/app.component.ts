import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { StorageService } from './services/storage.service';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ClimbWhereToday';

  isLoggedIn$!: Observable<boolean>;
  loggedIn:boolean=false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private loginSvc: LoginService, private router:Router) {
  }

  ngOnInit():void{
   this.isLoggedIn$=this.loginSvc.isLoggedIn;
  }

  logout():void{
    this.loginSvc.logout();
    this.loginSvc.isLoggedIn
    this.router.navigate(['']);
  }

}
