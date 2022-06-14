import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartItem} from "../../model/cartItem";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-cart-overlay',
  templateUrl: './cart-overlay.component.html',
  styleUrls: ['./cart-overlay.component.scss']
})
export class CartOverlayComponent implements OnInit {

  type: string = 'EDIT'
  @Output() overlayCart = new EventEmitter<any>();
  totalPrice: number = 0;
  @Input() cartItem: CartItem[] = [];
  cartNull: boolean = false;
  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this._cartService.TotalCartItems.subscribe(
      (data) => {
        this.cartItem = data;
        this.totalPrice = this._cartService.updateTotalPrice(this.cartItem);
        if (this.cartItem !== null && this.cartItem.length === 0){
          this.cartNull = true;
        }else if (this.cartItem === null || this.cartItem === undefined){
          this.cartNull = true;
        }else{
          this.cartNull = false;
        }
      }
    )
  }
  hiddenCart(){
    this.overlayCart.emit();
  }

  deleteProduct(c){
    this._cartService.deleteProduct(c);
  }

  deleteCart(){
    this._cartService.deleteCart();
  }


}
