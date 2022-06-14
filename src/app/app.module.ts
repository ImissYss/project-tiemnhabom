import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import {FooterComponent} from "./components/footer/footer.component";
import {ProductsComponent} from "./components/products/products.component";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {HomeComponent} from "./components/home/home.component";
import {HeroComponent} from "./components/hero/hero.component";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {CarouselModule} from "ngx-owl-carousel-o";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CartOverlayComponent} from "./components/cart-overlay/cart-overlay.component";
import {SidebarModule} from 'primeng/sidebar';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CartComponent} from "./components/cart/cart.component";
import {CartItemComponent} from "./components/cart-item/cart-item.component";
import {DialogModule} from "primeng/dialog";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {HttpClientModule} from "@angular/common/http";
import {OrderSuccessComponent} from "./components/order-success/order-success.component";
import {IntroduceComponent} from "./components/introduce/introduce.component";
import {ContactComponent} from "./components/contact/contact.component";
import {LazyLoadImageDirective} from "./directives/lazyLoadImage.directive";
import {TabViewModule} from "primeng/tabview";
import {FilterPipe} from "./pipes/filter.pipe";
import {SafePipe} from "./pipes/safe.pipe";
import {FixContentComponent} from "./components/fix-content/fix-content.component";
import {SignupComponent} from "./components/signup/signup.component";
import {WindowService} from "./service/window.service";
import {NgxPaginationModule} from "ngx-pagination";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailComponent,
    CartOverlayComponent,
    CartComponent,
    CartItemComponent,
    OrderSuccessComponent,
    IntroduceComponent,
    ContactComponent,
    LazyLoadImageDirective,
    FilterPipe,
    SafePipe,
    FixContentComponent,
    SignupComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SidebarModule,
    DialogModule,
    ScrollPanelModule,
    HttpClientModule,
    TabViewModule,
    BrowserTransferStateModule,
    NgxPaginationModule



  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
