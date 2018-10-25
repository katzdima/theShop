import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product , ProductGetAllRes} from '../../../interfaces/product';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  is_edit: boolean = false;
  products: Product[];
  constructor(private _productsService: ProductsService,private _authService: AuthService,private _router: Router) { }

  ngOnInit() {
    this._authService.adminListener.subscribe(res => {
      if(!res){
        this._router.navigate(['']);
      }
    });

    this._productsService.getAllProducts().subscribe((res:ProductGetAllRes) => {
      this.products = res.data;
    })
    
  }
  productToEdit=0;
  editProduct(product){
    this.is_edit= true;
    this.productToEdit=product ;
  }
  addProduct(){
    this.is_edit= false;
  }
}
