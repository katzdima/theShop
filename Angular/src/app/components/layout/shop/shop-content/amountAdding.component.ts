import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CartService } from '../../../../services/cart.service';
import { ItemService } from '../../../../services/item.service';

@Component({
    selector: 'amountAdding',
    templateUrl: './amountAdding.component.html',
  })
  export class amountAdding {
    amount:number;

    constructor(
        private _cartService:CartService,
        private _itemService:ItemService,
        public dialogRef: MatDialogRef<amountAdding>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    addProductToCart(product,amount){
        if(amount>0){
            const cartId=this._cartService.getCurrentCartId();
            const total = product.price * amount;
            const item = {
                product:product._id,
                quantity:amount,
                totalPrice:total,
                cart:cartId
            };
            this._itemService.addItem2Cart(item);
        }
    }

  }