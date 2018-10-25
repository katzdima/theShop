import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  isAuth;
  constructor(public _authservice: AuthService) { }

  ngOnInit(){
    this.isAuth = this._authservice.isAuth();
  }

}
