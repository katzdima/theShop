import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ordersApiUrl = 'http://localhost:3000/api/orders/';
  constructor(private _http: HttpClient) { }

  getOrderCount(){
    return this._http.get(this.ordersApiUrl+'count'); 
  }

  createOrder(order){
    return this._http.post(this.ordersApiUrl+ 'create',order);
  }
}
