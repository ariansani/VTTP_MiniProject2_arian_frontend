import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Gym, Package } from '../models';
import { GymService } from '../services/gym.service';
import { PackageService } from '../services/package.service';
import { StorageService } from '../services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css'],
})

export class AddPackageComponent implements OnInit {
  gym!: Gym;
  gymId!: number;
  userId!: number;
  addForm!: FormGroup;
  package!: Package;
  apiLoaded: Observable<boolean>;
  display: any;
  center!: google.maps.LatLngLiteral;
  zoom = 16;
  markerOptions!: google.maps.MarkerOptions;
  markerPositions!: google.maps.LatLngLiteral[];
  title!: string;
  label!: string;


  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private packageSvc: PackageService,
    private gymSvc: GymService,
    private storageSvc: StorageService
  ) {
    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyDFaXNvUSNlqQoqlNBgCgppWcSeYxb5kDM',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  ngOnInit(): void {
    this.gymId = this.activatedRoute.snapshot.params['gymId'];

    this.gymSvc
      .getGym(this.gymId)
      .then((result) => {

        this.gym = result;
        this.userId = this.storageSvc.getUserId();
        this.addForm = this.createForm();
        this.center = {
          lat: this.gym.latitude,
          lng: this.gym.longitude,
        };
        this.markerOptions = {
          draggable: false,
        };
        this.markerPositions = [
          {
            lat: this.gym.latitude,
            lng: this.gym.longitude,
          },
        ];
        this.title=this.gym.name;
        this.label=this.gym.name;
      })
      .catch((error) => console.info('>>>> error:' + error));
  }

  createForm() {
    let y: number = +this.gymId;
    let z: number = +this.userId;
    return this.fb.group({
      gymId: [y, Validators.required],
      userId: [z, Validators.required],
      gymName: [this.gym.name, Validators.required],
      entryPasses: [Validators.min(1), Validators.required],
      expiryDate: ['', Validators.required],
      expired: [false, Validators.required],
    });
  }

  onSubmit(): void {

    this.package = this.addForm.value as Package;


    this.packageSvc
      .addPackage(this.package)
      .then(() => {
       
        const Toast = Swal.mixin({
          toast: true,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          position:'bottom',
          title: "Added new package : "+this.package.gymName,
          text: "Redirecting...",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            //refresh page
            this.router.navigate(['/packages/']);
          }
        });

      })
      .catch((error: string) => console.info('error' + error));

  }
}
