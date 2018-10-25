import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { CategoriesService } from '../../../../services/categories.service';
import { ProductsService } from '../../../../services/products.service';

import { Product , ProductGetAllRes} from '../../../../interfaces/product';



@Component({
  selector: 'app-products-form-edit',
  templateUrl: './products-form-edit.component.html',
  styleUrls: ['./products-form-edit.component.css']
})
export class ProductsFormEditComponent implements OnInit {

  @Input() product:Product;
  productModel;
  data;
  categories;
  image: File;
  catName;
  cat;
  constructor(private _categoriesService: CategoriesService, private _ProductsService: ProductsService,private _router: Router) { }

  ngOnInit() {
    this._categoriesService.getAllCategoies().subscribe((res)=>{
      this.data=res;
      this.categories=this.data.data;
    })

      this.productModel = {
      name: this.product.name,
      price: this.product.price,
      category: { _id: this.product.category._id , name: this.product.category.name},
      image:''
    };
  }

  editProduct(){
    this._categoriesService.getCategoryById(<string>this.productModel.category._id).subscribe((res)=>{
      this.catName = res;
      this.cat = {
        _id:<string> this.productModel.category._id,
        name: this.catName.data[0].name
      };
      this.catName = JSON.stringify(this.cat);
      this._ProductsService.editProduct(this.product._id, this.productModel.name, this.productModel.price, this.image, this.catName).subscribe((res)=>{
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

  
  deleteProduct(){
    this._ProductsService.deleteProduct(this.product._id).subscribe((res=>{
      this._router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
      };
      this._router.navigate(['products']);
    }));
  }
}
