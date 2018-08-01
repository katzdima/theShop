import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/layout/about/about.component';
import { ShopComponent } from './components/layout/shop/shop.component';
import { StatisticsComponent } from './components/layout/statistics/statistics.component';
import { ProductsComponent } from './components/layout/products/products.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CategoryNavbarComponent } from './components/layout/shop/category-navbar/category-navbar.component';
import { CartSidebarComponent } from './components/layout/shop/cart-sidebar/cart-sidebar.component';
import { ShopContentComponent } from './components/layout/shop/shop-content/shop-content.component';

import{ProductsService} from './services/products.service';
import{CategoriesService} from './services/categories.service';

const appRoutes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: 'shop', component: ShopComponent}
 // { path: 'all', component: AllComponent },
  //{ path: 'single/add', component: SingleAddComponent },
 // { path: 'single/:id', component: SingleViewComponent },
 // { path: 'single/:id/edit', component: SingleEditComponent },
 // { path: '', component: HomeComponent },
 // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    ShopComponent,
    StatisticsComponent,
    ProductsComponent,
    LayoutComponent,
    CategoryNavbarComponent,
    CartSidebarComponent,
    ShopContentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductsService,CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
