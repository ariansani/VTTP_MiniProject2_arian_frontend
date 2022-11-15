import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PackagesComponent } from './components/packages.component';
import { LoginComponent } from './components/login.component';
import { GymsComponent } from './components/gyms.component';
import { GymService } from './services/gym.service';
import { PackageService } from './services/package.service';
import { AddPackageComponent } from './components/add-package.component';
import { EditPackageComponent } from './components/edit-package.component';
import { LoginService } from './services/login.service';
import { RegisterComponent } from './components/register.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { httpInterceptorProviders } from './helper/http.interceptor';
import { StorageService } from './services/storage.service';
import { WeatherService } from './services/weather.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DialogContentExampleDialogComponent } from './components/dialog-content-example-dialog.component';
import { HistoryComponent } from './components/history.component';
import {MatFormFieldModule} from '@angular/material/form-field';


const routes: Routes = [
  {path: '', component: LoginComponent },
  {path:'register', component:RegisterComponent},
  {path:'history', component:HistoryComponent},
  { path: 'addPackage/:gymId', component: AddPackageComponent },
  { path: 'editPackage/:uuid', component: EditPackageComponent },
  {path:'packages', component:PackagesComponent},
  {path:'gyms', component:GymsComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    PackagesComponent,
    LoginComponent,
    GymsComponent,
    AddPackageComponent,
    EditPackageComponent,
    RegisterComponent,
    DialogContentExampleDialogComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatSliderModule,
    FormsModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'}),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    FlexLayoutModule,
    MatDialogModule,
    MatProgressBarModule,
    MatFormFieldModule,

  ],
  providers: [GymService,PackageService,StorageService,WeatherService, LoginService,httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
