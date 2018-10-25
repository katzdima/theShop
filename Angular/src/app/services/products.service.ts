import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductsService {
  productsApiUrl = 'http://localhost:3000/api/products/';


  constructor(private _http: HttpClient) { }

  getAllProducts() {
    return this._http.get(this.productsApiUrl + 'all');
  }
  
  addProduct(name: string, price: string, image: File, category: any){
    let  productData = new FormData();
    productData.append('name', name);
    productData.append('price', price);
    productData.append('image', image);
    productData.append('category', category);
    return this._http.post(this.productsApiUrl + 'add',productData);
  }


  editProduct(id: string, name: string, price: string, image: File, category: any){
    let  productData = new FormData();
    productData.append('id', id);
    productData.append('name', name);
    productData.append('price', price);
    productData.append('image', image);
    productData.append('category', category);
    return this._http.post(this.productsApiUrl + 'update',productData);
  }

  deleteProduct(id: string){
    return this._http.delete(this.productsApiUrl + id);
  }
  getProductCount(){
    return this._http.get(this.productsApiUrl+'count'); 
  }
}
