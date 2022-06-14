import {Component, Input, OnInit} from '@angular/core';
import {CartItem} from "../../model/cartItem";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem;
  @Input() type: string = 'EDIT'

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
  }

  plusQuantity(c){
    this._cartService.plusQuantity(c);
  }
  minusQuantity(c){
    this._cartService.minusQuantity(c);
  }
  deleteProduct(p){

  }

}
