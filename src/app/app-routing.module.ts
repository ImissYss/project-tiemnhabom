import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {HomeComponent} from "./components/home/home.component";
import {CartComponent} from "./components/cart/cart.component";
import {OrderSuccessComponent} from "./components/order-success/order-success.component";
import {IntroduceComponent} from "./components/introduce/introduce.component";
import {ContactComponent} from "./components/contact/contact.component";
import {SignupComponent} from "./components/signup/signup.component";

const routes: Routes = [
  {path: "", component: HomeComponent},

  {path: "san-pham/:productId", component: ProductDetailComponent},
  {path: "gio-hang", component: CartComponent},
  {path: "dat-hang-thanh-cong", component: OrderSuccessComponent},
  {path: "gioi-thieu", component: IntroduceComponent},
  {path: "lien-he", component: ContactComponent},
  {path: 'dang-ki', component: SignupComponent},
  {path:'', pathMatch: 'full', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
