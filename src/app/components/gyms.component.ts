import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Gym, Weather } from '../models';
import { GymService } from '../services/gym.service';
import { WeatherService } from '../services/weather.service';
import { DialogContentExampleDialogComponent } from './dialog-content-example-dialog.component';

const BOULDER_IMAGES = [
  './../assets/images/boulderworldpayalebar.jpg',
  './../assets/images/boulderworldpayalebar.jpg',
  './../assets/images/boulderplanetsembawang.jpg',
  './../assets/images/borudaalexandra.jpg',
  './../assets/images/boulderplusjurong.jpg',
];

@Component({
  selector: 'app-gyms',
  templateUrl: './gyms.component.html',
  styleUrls: ['./gyms.component.css'],
})
export class GymsComponent implements OnInit {
  gyms!: Gym[];
  weatherJson!: Weather;
  weather!: Weather[];
  dialogWeatherJson!:Weather;

  gymImages: string[] = BOULDER_IMAGES;

  constructor(
    private gymSvc: GymService,
    private router: Router,
    private weatherSvc: WeatherService,
    public dialog: MatDialog
  ) {}

  openDialog(gymId:number) {
   
    this.weatherSvc
    .getWeather(gymId)
    .then((result) => {
      

      this.dialogWeatherJson = result;

      const dialogRef = this.dialog.open(DialogContentExampleDialogComponent,{
      
        data: result,
        height: '300px',
        width: '900px'
      });
  
      dialogRef.afterClosed().subscribe((r) => {
        console.log(`Dialog result: ${r}`);
      });

    })
    .catch((error) => console.info('>>>> error:' + error));

   
  }

  ngOnInit(): void {
    this.gymSvc
      .getGyms()
      .then((result) => {

        this.gyms = result;
      })
      .catch((error) => console.info('>>>> error:' + error));
  }

  onAdd(gymId: number): void {
    this.router.navigate(['/addPackage', gymId]);
  }

  reverseString(str: string): string {
    return str.split('-').reverse().join('-');
  }
}

