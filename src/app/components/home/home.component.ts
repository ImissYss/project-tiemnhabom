import { Component, OnInit } from '@angular/core';
import {CartService} from "../../service/cart.service";
import {CartItem} from "../../model/cartItem";
import {Meta, Title} from "@angular/platform-browser";
import {CanonicalService} from "../../service/canonical.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  titleSeo: string = 'Tiệm nhà bom - cửa hàng thực phẩm nhập khẩu cao cấp - chuyên cung cấp thực phẩm cho mẹ và bé';

  constructor(private _cartService: CartService,
              private metaTagService: Meta,
              private canonicalService: CanonicalService,
              private titleService: Title) {
    let cart: CartItem[] = this._cartService.getCart();
    this._cartService.setTotalCartItems(cart);
    if (cart !== null){
      this._cartService.setTotalItems(cart.length);
    }else{
      this._cartService.setTotalItems(0);
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.titleSeo);
    this.metaTagService.updateTag({name: 'description', content: 'Tiệm nhà bom - cửa hàng thực phẩm cao cấp với những sản phẩm chất lượng' +
        'nhập từ nhiều quốc gia như: ngũ cốc calbee, rong biển ăn liền...cùng nhiều ưu đãi hấp dẫn dành cho khách hàng như free ship, giảm giá,...' +
        'Liên hệ ngay: 0387333535, rất hân hạnh được phục vụ quý khách!'})
    this.canonicalService.setCanonicalURL("https://tiemnhabom.com");
    this.metaTagService.addTags([
      {name: 'robots', content: 'max-image-preview:large'},
      // {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'},
      {name: 'robots', content: 'max-snippet:-1, max-image-preview:large, max-video-preview:-1'},
      {name: 'keywords', content: 'Thực phẩm, thực phẩm nhập khẩu'},
      {name: 'author', content: 'tiem nha bom'},
      {property: 'og:locale', content: 'vi-VN'},
      {property: 'og:type', content: 'website',},
      {property: 'og:title', content: 'Thực phẩm nhập khẩu - tiệm nhà bom'},
      {property: 'og:description', content: ''},
    ])
    this.canonicalService.setOgUrl('og:url');
    // this.canonicalService.setOgUrl('og:site_name', 'TP Shop');
    this.metaTagService.updateTag(
      {name: 'twitter:card', content: 'summary'}
    )
    this.metaTagService.updateTag(
      {name: 'twitter:description', content: 'Tiệm nhà bom - cửa hàng thực phẩm cao cấp với những sản phẩm chất lượng' +
          'nhập từ nhiều quốc gia như: ngũ cốc calbee, rong biển ăn liền...cùng nhiều ưu đãi hấp dẫn dành cho khách hàng như free ship, giảm giá,...' +
          'Liên hệ ngay: 0387333535, rất hân hạnh được phục vụ quý khách!'}
    )
    this.metaTagService.updateTag(
      {name: 'twitter:title', content: 'Thực phẩm nhập khẩu - tiệm nhà bom'}
    )
  }

}
