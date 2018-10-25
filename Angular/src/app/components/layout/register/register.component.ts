import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserData} from '../../../interfaces/user';

import { AuthService } from '../../../services/auth.service';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validationErr: string;
  isStepOne : Boolean = true;
  emailVerif:Boolean;
  temp;
  regInfo = {
    email:'',
    pwd1:'',
    pwd2:'',
    firstName:'',
    lastName:'',
    city:'',
    street:''
  } ; 
  constructor(public _authservice: AuthService) { }

  ngOnInit() {
  }
  async stepOne(){
    this.emailVerif=false;
    if (this.regInfo.pwd1 !== this.regInfo.pwd2) {
      this.validationErr = 'Passwords are different';
      return;
    }
    this.temp = await this._authservice.isRegisteredMail(this.regInfo.email);
    this.emailVerif = JSON.parse(this.temp);
    if(this.emailVerif == true){
      this.validationErr = 'This Email is registered in the system, change Email or Login.';
      return;
    }
    if (this.emailVerif == false){
      this.emailVerif=false;
      this.validationErr=null;
      this.isStepOne = false;
      return;
    }
    return;
  }
  stepTwo(){
    let user: UserData = {
      firstname: this.regInfo.firstName,
      lastname: this.regInfo.lastName,
      email: this.regInfo.email,
      pwd: this.regInfo.pwd1,
      city: this.regInfo.city,
      street: this.regInfo.street,
      role: ''
    };
    this._authservice.regUser(user);
    
  }
  returnToStepOne(){
    this.isStepOne = true;
  }
}
