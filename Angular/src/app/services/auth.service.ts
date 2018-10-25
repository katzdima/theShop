import { Injectable } from '@angular/core';
import { UserData } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData } from '../interfaces/authData';
import { Subject } from 'rxjs';
import { CartService } from './cart.service';


@Injectable()//{providedIn: 'root'})


export class AuthService {
  usersApiUrl = 'http://localhost:3000/api/users/';
  token: string;
  userId:string;
  userData;
  isPastAuth :boolean = false;
  check;
  authListener = new Subject<boolean>();
  adminListener= new Subject<boolean>();
  loginValidListener= new Subject<boolean>();
  constructor(private _http: HttpClient, private _router: Router,private _cartService: CartService) { }

  loadToken(){
    return this.token;
  }

  isAuth(){
    return this.isPastAuth;
  }
  getUserId(){
    return this.userId;
  }
  getuserData(){
    return this.userData;
  }
  getAuthListener(){
    return this.authListener.asObservable();
  }
  getAdminListener(){
    return this.adminListener.asObservable();
  }
  getLoginValidListener(){
    return this.loginValidListener.asObservable();
  }

  regUser(user: UserData){
    const data: UserData = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      pwd: user.pwd,
      city: user.city,
      street: user.street,
      role: 'costumer'
    };
    this._http.post(this.usersApiUrl + 'register', data)
      .subscribe(res => {
        this._router.navigate(['login']);
      }, error => {
        this.authListener.next(false);
        this.adminListener.next(false);
        console.log('error',error);
      });
  }


  login(loginData: AuthData){
    const AData :AuthData = { email:loginData.email, pwd:loginData.pwd};
    this._http.post<{msg:string,token:string,userdata:any}>(this.usersApiUrl+'login',AData)
      .subscribe(res =>{
        this.isPastAuth=true;
        const temp = res;
        this.userData = temp.userdata;
        this.token = temp.token;
        localStorage.setItem("token", this.token);
        localStorage.setItem("user", temp.userdata);
        this.authListener.next(true);
        
        if(temp.userdata.role == 'admin'){
          this.adminListener.next(true);
          this._router.navigate(['products']);
        } else {
          this._cartService.loginCart(temp.userdata._id);
          this.userId = temp.userdata._id;
          this.adminListener.next(false);
          this._router.navigate(['shop']);
        }
      }, error =>{
        this.authListener.next(false);
        this.adminListener.next(false);
        if(error.status == 401){
          this.loginValidListener.next(false);
        }
      }
      )
      
  }

  logout(){
    this.token = null;
    this.isPastAuth=false;
    this.userData = null;
    this.userId = '';
    this.authListener.next(false);
    this.adminListener.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._router.navigate(['/']);
  }

  isRegisteredMail(email){
      return new Promise((resolve) => {
        this._http.get(this.usersApiUrl + 'emailcheck/' + email)
          .subscribe((data) => {
            this.check = data;
            resolve(this.check.data);
          });
      });
  };

  getUserCount(){
   return this._http.get(this.usersApiUrl+'count');    
  }
}
