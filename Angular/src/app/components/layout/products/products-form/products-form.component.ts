import { Component, OnInit,Input,OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { CategoriesService } from '../../../../services/categories.service';
import { ProductsService } from '../../../../services/products.service';

import { Product , ProductGetAllRes} from '../../../../interfaces/product';




@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit  {
  productModel = {
    name: '',
    price: '',
    category: { _id:'' , name: ''},
    image:''
  };
  data;
  categories;
  image: File;
  catName;
  cat;
  send;
  new
  constructor(private _categoriesService: CategoriesService,private _ProductsService: ProductsService,private _http: HttpClient, private _router: Router) { }

  ngOnInit() {
    this._categoriesService.getAllCategoies().subscribe((res)=>{
      this.data=res;
      this.categories=this.data.data;
    })
    
  }
  
  addProduct(){
    this._categoriesService.getCategoryById(<string>this.productModel.category._id).subscribe((res)=>{
      this.catName = res;
      this.cat = {
        _id:<string> this.productModel.category._id,
        name: this.catName.data[0].name
      };
      this.catName = JSON.stringify(this.cat);
      this._ProductsService.addProduct(this.productModel.name, this.productModel.price, this.image, this.catName).subscribe((res)=>{
        this._router.routeReuseStrategy.shouldReuseRoute = function() {
          return false;
        };
        this._router.navigate(['products']);
      });
    });
  }

  onFileChange(event:Event){
     this.image = (event.target as HTMLInputElement).files[0];
  }
}
