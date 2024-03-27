import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { User } from '../../core/Model/object-model';
import { Router } from '@angular/router';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, ReactiveFormsModule],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.css'
})

export class SigninSignupComponent {

  /**VARIABLES THAT WE WOULD NEED FOR LOGIN */
  regForm:boolean = false;
  signUpfrom!:FormGroup;
  signInfrom!:FormGroup;
  signUpsubmitted = false;
  href:string='';
  user_data:any;
  user_dto!:User;
  user_reg_data:any;
  signInFormValue:any ={};

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginSignupService){

  }
  ngOnInit():void{
    
    this.href = this.router.url;
    if (this.href == '/sign-up'){
      this.regForm = true;
    }else if(this.href == '/sign-in'){
      this.regForm = false;
    }

    this.signUpfrom = this.formBuilder.group({
      name:['',Validators.required],
      mobNumber:['',Validators.required],
      age:['',Validators.required],
      dob:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      addLine1:['',Validators.required],
      addLine2:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      zipCode:['',Validators.required],
      language:['',Validators.required],
      gender:['',Validators.required],
      aboutYou:['',Validators.required],
      upLoadPhoto:['',Validators.required],
      agreetc:['',Validators.required],
      role:['',Validators.required]
    });

  }
  get rf(){
    return this.signUpfrom.controls;
  }

  onSubmitSignUp(){
    this.signUpsubmitted = true;
    if(this.signUpfrom.invalid){
      return;
    }
    this.user_reg_data = this.signUpfrom.value;
    this.user_dto = {
      aboutYou:this.user_reg_data.aboutYou,
      age:this.user_reg_data.age,
      agreetc:this.user_reg_data.agreetc,
      dob:this.user_reg_data.dob,
      email:this.user_reg_data.email,
      gender:this.user_reg_data.gender,
      address:{
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
      },
      language:this.user_reg_data.language,
      mobNumber:this.user_reg_data.mobNumber,
      name:this.user_reg_data.name,
      password:this.user_reg_data.password,
      uploadPhoto:this.user_reg_data.upLoadPhoto,
      role:this.user_reg_data.role
    }
    this.loginService.userRegister(this.user_dto).subscribe(data=>{
      alert("User Register Successfull 0");
      this.router.navigateByUrl('/sign-in');
    })

  }
}
