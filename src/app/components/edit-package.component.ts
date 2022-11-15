import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Package } from '../models';
import { PackageService } from '../services/package.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.css']
})
export class EditPackageComponent implements OnInit {

  editForm!:FormGroup
  uuid!:string
  package!: Package
  updatePackage!: Package

  constructor( private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private packageSvc: PackageService) {


  }

  ngOnInit(): void {
    this.uuid = this.activatedRoute.snapshot.params['uuid'];
    this.packageSvc.getUniquePackage(this.uuid)
    .then((result) =>{

      this.package=result;
      this.editForm = this.createForm();
    }).catch((error)=>
    console.info(">>>> error:"+error))

  }

  
  createForm() {
    return this.fb.group({
      packageUUID:  [this.uuid, Validators.required],
      gymId: [this.package.gymId, Validators.required],
      gymName: [this.package.gymName, Validators.required],
      userId: [this.package.userId, Validators.required],
      entryPasses: [Validators.min(1), Validators.required],
      expiryDate: ['', Validators.required],
      expired:[false, Validators.required]
    });
  }

  onSubmit(): void {

    this.updatePackage = this.editForm.value as Package;


    this.packageSvc
      .editPackage(this.updatePackage)
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
          title: "Made changes to "+this.updatePackage.gymName,
          text: this.updatePackage.entryPasses+" passes expiring on "+this.updatePackage.expiryDate,
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

  
  reverseString(str: string): string {
    return str.split('-').reverse().join('-');
  }




}
