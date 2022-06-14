import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {map, Subject, takeUntil} from "rxjs";
import {ProductService} from "../../service/product.service";
import {Product} from "../../model/product";
import {OwlOptions} from "ngx-owl-carousel-o";
import {CartService} from "../../service/cart.service";
import {NavigatorService} from "../../service/navigator.service";
import {DOCUMENT} from "@angular/common";
import {CartItem} from "../../model/cartItem";
import {Meta, Title} from "@angular/platform-browser";
import {CanonicalService} from "../../service/canonical.service";


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit , OnDestroy{


  spinner: boolean;
  view: boolean = false;
  view2: boolean = false;
  minus: boolean = true;
  count: number = 1;
  totalItems: number = 0;
  product: Product;
  imagesProducts: string[] = [];
  customOptions: OwlOptions = {
    loop: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }


  productSame: Product[] = [];
  destroy$: Subject<void> = new Subject();
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(private route: ActivatedRoute,
              private _productService: ProductService,
              private _cartService: CartService,
              private _navigatorService: NavigatorService,
              private meta: Meta,
              private title: Title,
              private canonicalService: CanonicalService,
              @Inject(DOCUMENT) private document: Document,
              ) {
    let cart: CartItem[] = this._cartService.getCart();
    this._cartService.setTotalCartItems(cart);
    if (cart !== null){
      this._cartService.setTotalItems(cart.length);
    }else{
      this._cartService.setTotalItems(0);
    }
  }
  ngOnInit(): void {
    this.spinner = true;
    this._cartService.TotalItems.pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.totalItems = data;
      }
    )
    this.route.paramMap.pipe(map((param: ParamMap) => param.get('productId'))).pipe(takeUntil(this.destroy$)).subscribe(
      param => {
        this._productService.getProduct(param!).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            this.product = data;
            this.meta.addTags([
              {name: 'robots', content: 'max-image-preview:large'},
              {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'},
              {name: 'robots', content: 'max-snippet:-1, max-image-preview:large, max-video-preview:-1'},
              {property: 'og:locale', content: 'vi-VN'},
              {property: 'og:type', content: 'website'},
            ])
            this.title.setTitle(data.titleSeo);
            this.meta.updateTag(
              {name: 'twitter:card', content: 'summary'}
            )
            data.metaTagNames.forEach(d => {
              this.meta.updateTag({name: d.name, content: d.content});
            })
            data.metaTags.forEach(d => {
              this.meta.updateTag({name: d.property, content: d.content});
            })
            this.canonicalService.setCanonicalURL("https://tiemnhabom.com/san-pham/" + data.productId);
            this.spinner = false;
            window.scroll({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
            this.imagesProducts = data['productImage'];
          }
        )
      }
    )
    this._productService.getProducts().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.productSame = data.filter(item => item.category.categoryName === this.product.category.categoryName);
      }
    )
    this._cartService.viewCartValue.subscribe(
      (data) => {
        this.view = data;
      }
    )
  }
  addToCart(product, quantity){
    this._cartService.addProductToCart(product, quantity);
    this.view2 = true;

  }

  plusCount(): void{
      this.count ++;
      this.minus = false;
  }
  minusCount(): void{
    if (this.count == 1){
      this.minus = true;
    }else {
      this.count --;
      if (this.count == 1){
        this.minus = true;
      }
    }
  }

  backToPreviousPage(){
    this._navigatorService.back();
  }
  showBar(){

  }

  validateCount(){
    if (this.count < 1){
      this.count = 1;
    }
  }

  hiddenCart(){
    this.view = false;
    this.view2 = false;
    this._cartService.setViewCart(false);
  }

  viewCart(){
    this.view2 = true;
  }

}
