import { Component, OnInit , OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../../../services/cart.service';
import { ItemService } from '../../../../services/item.service';
import { Cart } from '../../../../interfaces/cart';
import { Item } from '../../../../interfaces/item';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.css']
})
export class CartSidebarComponent implements OnInit , OnDestroy {
  cartListener: Subscription;
  cartId: any;
  itemsInCartArr: Item[] =[];
  itemsInCartListener: Subscription;
  totalCartPrice:number=0;
  itemsAmount:number=0;
  cartTMP: Cart;
  userId:string;
  constructor(private _cartService: CartService,private _itemService: ItemService,private _authService : AuthService,private _router: Router) { }

  ngOnInit() {

    this.cartListener = this._cartService.getCartListener().subscribe((cart) =>{
      if(cart){
        this.cartId = cart;
      }
      else{
        
        this.cartId = 'null';
      }
    })

    this.itemsInCartListener = this._itemService.getCartItemsListener().subscribe(res =>{
      this.itemsInCartArr = [];
      let items = res.items;
      if(items.length > 0){
        this.itemsAmount = items.length;
        this.totalCartPrice =0;
        for(let i=0;i<items.length;i++){
          this.totalCartPrice += items[i].totalPrice ; 
        }
        this.itemsInCartArr = items;
      }
      else{
        this.totalCartPrice =0;
        this.itemsAmount = 0;
        this.itemsInCartArr = [];
      }
    })
    this.userId = this._authService.getUserId();
    this._cartService.loginCart(this.userId);
  }


  deleteItem(item){
    this._itemService.deleteItem(item._id);
  }

  discardCart(){
    this._itemService.deleteAllItem(this._cartService.getCurrentCartId());
  }

  placeOrder(){
    this.itemsInCartArr = [];
    this._router.navigate(['order']);
  }

  ngOnDestroy(){
    this.itemsInCartListener.unsubscribe();
  }
}
