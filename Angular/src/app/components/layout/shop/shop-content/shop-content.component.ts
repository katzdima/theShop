import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { CategoriesService } from '../../../../services/categories.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { amountAdding } from './amountAdding.component';

@Component({
  selector: 'app-shop-content',
  templateUrl: './shop-content.component.html',
  styleUrls: ['./shop-content.component.css']
})


export class  ShopContentComponent implements OnInit ,OnDestroy {
  temp;
  data;
  allProducts:Boolean = true;
  selected:string ='';
  categoryListener: Subscription;
  amount: number =0;
  constructor(private _productsService: ProductsService,private _categoriesService: CategoriesService,public _dialog: MatDialog) { }

  ngOnInit() {
    this._productsService.getAllProducts().subscribe((res) => {
      this.temp =res;
      this.data = this.temp.data;
    })

    this.categoryListener = this._categoriesService.getSelectedCategory().subscribe(res => {
      if(res=='all'){
        this.allProducts=true;
        this.selected = '';
      }else{
        this.selected = res;
        this.allProducts=false;
      }
    });
  }

  addProductDataToCard(product){
    this._dialog.open(amountAdding,{data:{product:product}});
  };

  ngOnDestroy(){
    this.categoryListener.unsubscribe();
  }
  
}
