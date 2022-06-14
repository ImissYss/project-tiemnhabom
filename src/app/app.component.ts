import {Component, HostListener} from '@angular/core';
import {CartService} from "./service/cart.service";
import {CartItem} from "./model/cartItem";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tiemnhabom';
  isShow: boolean;
  topPosToStartShowing = 100;
  infoShop = {
    phone: '0387333535',
    linkFanpage: 'https://www.facebook.com/thucphamtiemnhabom/',
    linkMessage: 'm.me/thucphamtiemnhabom',
    linkGoogleMap: 'https://goo.gl/maps/acYRan4oW4XmuKc47'
  }

  @HostListener('window:scroll')
  checkScroll() {

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
