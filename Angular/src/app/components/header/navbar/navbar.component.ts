import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit , OnDestroy{
  currentUrl: string;
  authListener: Subscription;
  isAuth=false;
  isAdmin=false;
  adminListener: Subscription;

  constructor(private router: Router,private authService: AuthService) { 
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url);

  }
  
  ngOnInit() {
    this.isAuth = this.authService.isAuth();
    this.authListener = this.authService.getAuthListener().subscribe(is => {this.isAuth = is;})
    this.adminListener = this.authService.getAdminListener().subscribe(is => {this.isAdmin = is;})
  }
  
  logout(){
    this.authService.logout();
  }
  ngOnDestroy(){
    this.authListener.unsubscribe();
    this.adminListener.unsubscribe();
  }

}
