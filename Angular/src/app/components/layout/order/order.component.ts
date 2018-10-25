import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item.service';
import { CartService } from '../../../services/cart.service';
import { Subscription } from 'rxjs';
import { Item } from '../../../interfaces/item';
import { AuthService } from '../../../services/auth.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { orderconfirm } from './orderconfirm.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  cartId:string ;
  itemsArr: Item[] =[] ;
  totalPrice:number = 0;
  today;
  in2weeks;
  orderModel;
  userData;
  dateValid = true;
  visaREGEXP = /^4[0-9]{12}(?:[0-9]{3})?$/;
  creditValid= true;
  constructor(private _itemService: ItemService, private _cartService : CartService, private _authService:AuthService, public _dialog: MatDialog) { }

  ngOnInit() {
    this.cartId = this._cartService.getCurrentCartId();
    this.itemsArr = this._itemService.getItems();
    for(let i=0;i<this.itemsArr.length;i++){
      this.totalPrice += this.itemsArr[i].totalPrice ; 
    }
    this.userData = this._authService.getuserData();
    this.today = new Date (Date.now());
    this.in2weeks = new Date(Date.now() + 12096e5);
    this.orderModel = {
      city: '',
      street: '',
      date: null,
      credit:''
    };
  }

  loadUserData2Form(){
    this.orderModel.city= this.userData.city;
    this.orderModel.street= this.userData.street;
  }

  placeOrder(){
    this.dateValid = true;
    this.creditValid= true;
    if((Date.parse(this.orderModel.date) < Date.parse(this.today)) ||  (Date.parse(this.orderModel.date) > Date.parse(this.in2weeks))){
      this.dateValid = false;
      return;
    }
    if(!this.visaREGEXP.test(this.orderModel.credit)){
      this.creditValid= false;
      return;
    }

    this._dialog.open(orderconfirm,{data:{order:this.orderModel,cart:this.cartId,user:this.userData,totalPrice:this.totalPrice}})
  }

}
