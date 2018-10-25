import { Component, OnInit } from '@angular/core';
import { AuthData } from '../../../interfaces/authData';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginInfo = {
    email:'',
    pwd:''
  }
  valid = true;
  
  constructor(public _authservice: AuthService) { }

  
  login(){
    let loginData :AuthData ={
      email: this.loginInfo.email,
      pwd: this.loginInfo.pwd
    }
    this._authservice.login(loginData);
    this._authservice.getLoginValidListener()
      .subscribe(res=>{
        this.valid = res;
      });
  }
}
