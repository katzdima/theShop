import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../../../services/products.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  users ;
  products;
  orders;
  usersTemp;
  productsTemp;
  ordersTemp;
  apiUrl='http://localhost:3000/api/';
  constructor(private _authService: AuthService,private _router: Router,private _productsService: ProductsService,private _orderService: OrderService) { }

  ngOnInit() {
  
    // this._authService.adminListener.subscribe(res => {
    //   if(!res){
    //     this._router.navigate(['']);
    //   }
    // });

    this._authService.getUserCount().subscribe(res =>{
      this.usersTemp = res;
      this.users = this.usersTemp.data;
    })

    this._productsService.getProductCount().subscribe(res =>{
      this.productsTemp = res;
      this.products = this.productsTemp.data;
    })

    this._orderService.getOrderCount().subscribe(res =>{
      this.ordersTemp = res;
      this.orders = this.ordersTemp.data;
    })

  }
  

}
