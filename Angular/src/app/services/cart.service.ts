import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Cart } from '../interfaces/cart';
import { ItemService } from './item.service';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartsApiUrl = 'http://localhost:3000/api/carts/';
  cartListener = new Subject();
  userId;
  currentCartId;
  constructor(private _http: HttpClient,private _itemService: ItemService, private _router: Router) { }

  getCartListener(){
    return this.cartListener.asObservable();
  }

  getCurrentCartId(){
    return this.currentCartId;
  }

  //at login check if user have open cart and if not creat one.
  loginCart(costomerId:string){
    this.userId = costomerId;
    this._http.get<{ msg: string, data: any }>(this.cartsApiUrl+`active/${costomerId}`)
      .subscribe(res =>{
        if(res.data){
          this.currentCartId = res.data[0]._id;
          this.cartListener.next(res.data[0]._id);
          this._itemService.allItemsInCart(this.currentCartId);
        }
        else{
          this._http.get<{ msg: string, data: any }>(this.cartsApiUrl+ `newcart/${this.userId}`)
            .subscribe(res=>{
              const tmp = res.data;
              this.currentCartId = tmp._id;
              this.cartListener.next( {cart :tmp});
            })
        }
      });
  }
  //creat new cart
  newCart(costumerId){
    return this._http.get(this.cartsApiUrl+ `newcart/${costumerId}`);
  }

  deactivateCart(cartId){
    return this._http.get(this.cartsApiUrl+`deactivatecart/${cartId}`).subscribe(res=>{
      this._router.navigate(['shop']);
    });
  }

}
