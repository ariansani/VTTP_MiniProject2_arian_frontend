import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Package } from '../models';
import { PackageService } from '../services/package.service';
import { StorageService } from '../services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
})
export class PackagesComponent implements OnInit {
  packages!: Package[];
  package!: Package;

  displayedColumns: string[] = [
    'gymName',
    'entryPasses',
    'expiryDate',
    'use',
    'edit',
    'delete',
  ];

  constructor(
    private packageSvc: PackageService,
    private router: Router,
    private storageSvc: StorageService
  ) {}

  ngOnInit(): void {
    this.packageSvc
      .getPackages(this.storageSvc.getUserId())
      .then((result) => {
        this.packages = result;
        
      })
      .catch((error) => {console.info('>>>> error:' + error.errorMessage)
      this.noPackageRedirect();
      
    }
      );
  }

  onEdit(uuid: string): void {
    this.router.navigate(['/editPackage', uuid]);
  }

  onUse(subPackage:Package): void {
    if (subPackage.entryPasses < 2) {
      this.onDelete(subPackage);
    } else {
      this.packageSvc
        .usePass(subPackage.packageUUID)
        .then((result) => {

          
          this.packageSvc
            .getPackages(this.storageSvc.getUserId())
            .then((result) => {
              this.packages = result;

              const Toast = Swal.mixin({
                toast: true,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });
      
              Toast.fire({
                icon: "success",
                position:'bottom',
                title: "Used 1x pass for "+ subPackage.gymName+"!",
              });


            })
            .catch((error) => console.info('>>>> error:' + error));
        })
        .catch((error) => console.info('>>>> error:' + error));
    }
  }

  onDelete(subPackage: Package): void {

    Swal.fire({
      title: 'Are you sure?',
      html: "Deleting package<br/><b>Gym</b> : "+subPackage.gymName+"<br/><b>Entry Passes</b> : "+subPackage.entryPasses+"<br/><b>Expiry Date</b> : "+this.reverseString(subPackage.expiryDate),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.packageSvc
        .deletePackage(subPackage.packageUUID)
        .then((result) => {
  
          Swal.fire(
            'Deleted!',
            'Your package has been deleted.',
            'success'
          );

          this.packages = [];
          this.packageSvc
            .getPackages(this.storageSvc.getUserId())
            .then((result) => {
              this.packages = result;
            })
            .catch((error) => console.info('>>>> error:' + error));
        })
        .catch((error) => console.info('>>>> error:' + error));

      }
    });



  }

  reverseString(str: string): string {
    return str.split('-').reverse().join('-');
  }

  noPackageRedirect(): void {
    Swal.fire({
      icon: 'info',
      title: 'Welcome to ClimbWhere!',
      html: "It appears you don't have any packages.<br/> Click below to get started!",
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Start',
      allowOutsideClick: false,
      backdrop: 'rgba(0,0,123,0.4)',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/gyms']);
      }
    });
  }


}
