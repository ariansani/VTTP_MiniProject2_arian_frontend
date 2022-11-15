import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from '../models';
import { LoginService } from '../services/login.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 
  registerForm!: FormGroup;
  userRegister!:UserRegister;


  constructor( private fb: FormBuilder,
    private router: Router, private loginSvc: LoginService,private storageSvc: StorageService) { }

  ngOnInit(): void {

    this.registerForm = this.createForm();
  }

  createForm() {
    return this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {

    this.userRegister = this.registerForm.value as UserRegister;

    this.loginSvc
      .register(this.userRegister)
      .then(() => {
       


        this.loginSvc
          .login(this.userRegister)
          .then((result) => {
            this.storageSvc.saveUserId(result.id);
            this.storageSvc.saveUserEmail(result.email);
            this.storageSvc.saveUserName(result.username);
  

            this.router.navigate(['/packages/']);
          })
      .catch((error: string) => console.info('error' + error));



      })
      .catch((error: string) => console.info('error' + error));

   
  }


}
