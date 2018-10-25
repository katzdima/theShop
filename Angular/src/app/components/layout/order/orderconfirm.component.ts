import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { OrderService } from '../../../services/order.service';
import { CartService } from '../../../services/cart.service';
import { ItemService } from '../../../services/item.service';


@Component({
    selector: 'orderconfirm',
    templateUrl: './orderconfirm.component.html',
    styles:['.container{width:300px;}']
  })
export class orderconfirm {
    ordermodel;
    cartId;
    today = new Date (Date.now());
    constructor(private _itemService: ItemService, private _orderService: OrderService ,private _cartService :CartService,public dialogRef: MatDialogRef<orderconfirm>,@Inject(MAT_DIALOG_DATA) public data: any) {}

    order(data){
        this.cartId = data.cart;
        this.ordermodel={
            customer:data.user._id,
            cart:data.cart,
            totalPrice:data.totalPrice,
            city:data.order.city,
            street:data.order.street,
            deliveryDate:data.order.date,
            orderDate:this.today,
            paiment:data.order.credit
        }
        this._orderService.createOrder(this.ordermodel).subscribe(res=>{
            this._cartService.deactivateCart(this.cartId);
            this._itemService.zeroItems();
        });
    }
}