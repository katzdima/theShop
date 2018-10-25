import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsArr: Item[] = [];
  itemsUpdate = new Subject<{items:  Item[]}>();
  itemsApiUrl = 'http://localhost:3000/api/items/';
  constructor(private _http: HttpClient, private _router: Router) { }


  getCartItemsListener() {
    return this.itemsUpdate.asObservable();
  }

  //add item to cart
  addItem2Cart(item:any){
    this._http.post<{msg:string, item:Item}>(this.itemsApiUrl+'add', item)
      .subscribe(res =>{
        this.itemsArr.push(res.item);
        this.itemsUpdate.next({items:this.itemsArr});
      })
  }

  //-------geting all the items of the cart--------
  allItemsInCart(cartId:string){
    this._http.get<{msg:string, item:Item[]}>(this.itemsApiUrl+`allcartitems/${cartId}`)
      .subscribe(res =>{
        if(res.item.length>0){
          this.itemsArr = Object.assign(this.itemsArr,res.item);
          this.itemsUpdate.next({items:this.itemsArr});
        }
      })
  }

  //-----current cart all items-------
  getItems(){
    return this.itemsArr;
  }

  //-------zeroimg the current cart all items-----
  zeroItems(){
    this.itemsArr=[];
  }

  //------delete item from cart---------
  deleteItem(itemId:string){
    this._http.delete<{msg:string, data:Item}>(this.itemsApiUrl+'deleteitem/'+itemId)
      .subscribe(res=>{
        let delItem = res.data;
        let index = this.itemsArr.findIndex(function(o){
          return o._id === delItem._id;
        })
        if(index!== -1){
          this.itemsArr.splice(index,1);
        }
        this.itemsUpdate.next({items:this.itemsArr});
      })
  }

  //------delete all item from cart---------
  deleteAllItem(cartId: string){
    this._http.delete(this.itemsApiUrl+`deleteall/${cartId}`)
      .subscribe(res =>{
        this.itemsArr =[];
        this.itemsUpdate.next({items:this.itemsArr});
      })
  }
}
