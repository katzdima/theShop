import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/layout/about/about.component';
import { ShopComponent } from './components/layout/shop/shop.component';
import { StatisticsComponent } from './components/layout/statistics/statistics.component';
import { ProductsComponent } from './components/layout/products/products.component';
import { CategoryNavbarComponent } from './components/layout/shop/category-navbar/category-navbar.component';
import { CartSidebarComponent } from './components/layout/shop/cart-sidebar/cart-sidebar.component';
import { ShopContentComponent } from './components/layout/shop/shop-content/shop-content.component';
import { ProductsFormComponent } from './components/layout/products/products-form/products-form.component';
import { ProductsFormEditComponent } from './components/layout/products/products-form-edit/products-form-edit.component';
import { RegisterComponent } from './components/layout/register/register.component';
import { LoginComponent } from './components/layout/login/login.component';
import { OrderComponent } from './components/layout/order/order.component';
import { amountAdding } from './components/layout/shop/shop-content/amountAdding.component';
import { orderconfirm } from './components/layout/order/orderconfirm.component';

import{ProductsService} from './services/products.service';
import{CategoriesService} from './services/categories.service';
import { AuthService } from './services/auth.service';

import { AuthInterceptor } from './security/auth-interceptor';
import { AuthGuard } from './security/auth-guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



const appRoutes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'order', canActivate : [ AuthGuard ], component: OrderComponent},
  {path: 'statistics', canActivate : [ AuthGuard ], component: StatisticsComponent},
  {path: 'shop', canActivate : [ AuthGuard ], component: ShopComponent},
  {path: 'products', canActivate : [ AuthGuard ], component: ProductsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  { path: '', component: AboutComponent },
  { path: '**', component: AboutComponent }
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
    CategoryNavbarComponent,
    CartSidebarComponent,
    ShopContentComponent,
    ProductsFormComponent,
    ProductsFormEditComponent,
    RegisterComponent,
    LoginComponent,
    amountAdding,
    OrderComponent,
    orderconfirm
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {onSameUrlNavigation: 'reload'}
    ),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [ProductsService,
              CategoriesService,
              AuthService,
              { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
              AuthGuard
            ],
  bootstrap: [AppComponent],
  entryComponents: [amountAdding,orderconfirm]
})
export class AppModule { }
