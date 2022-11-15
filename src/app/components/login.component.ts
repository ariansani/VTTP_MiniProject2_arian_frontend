import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLinkActive } from '@angular/router';
import { UserLogin } from '../models';
import { LoginService } from '../services/login.service';
import { StorageService } from '../services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  userLogin!:UserLogin;
 

  constructor( private fb: FormBuilder,
    private router: Router, private loginSvc: LoginService,private storageSvc: StorageService) { }

  ngOnInit(): void {
    this.loginForm = this.createForm();
  }

  createForm() {
    return this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {

    this.userLogin = this.loginForm.value as UserLogin;
    
    this.loginSvc
      .login(this.userLogin)
      .then((result) => {
        
        this.storageSvc.saveUserId(result.id);
        this.storageSvc.saveUserEmail(result.email);
        this.storageSvc.saveUserName(result.username);
   
        this.router.navigate(['/packages/']);
      })
      .catch((error: string) => console.info('error' + error));

   
  }



}
