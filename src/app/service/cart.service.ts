import { Injectable } from '@angular/core';
import {CartItem} from "../model/cartItem";
import {Product} from "../model/product";
import {BehaviorSubject, Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Order} from "../model/order";


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  public get TotalCartItems(): Observable<any>{
    return this.cartItems.asObservable();
  }
  setTotalCartItems(value: any){
    this.cartItems.next(value);

  }
  private viewCart:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public get viewCartValue(): Observable<any>{
    return this.viewCart.asObservable();
  }
  setViewCart(value: any){
    this.viewCart.next(value);

  }

  private totalItems: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public get TotalItems():Observable<any>{
    return this.totalItems.asObservable();
  }
  setTotalItems(value: any){
    this.totalItems.next(value);
  }
  cart = [];

  constructor(private afs: AngularFirestore) { }

  createCart(){
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  getCart(): CartItem[]{
    return JSON.parse(<string>localStorage.getItem("cart"));
  }

  addProductToCart(product: Product, quantity){
    let cart =<Array<any>>this.getCart();
    if (cart !== null && cart.length !== 0){
      let inCart = cart.find(item => item.product.productId === product.productId);
      if (inCart){
        let newCart = cart.filter(item => item.product.productId !== product.productId);
        let newCartItem = new CartItem(inCart.product, inCart.quantity+quantity);
        newCart.push(newCartItem);
        localStorage.setItem("cart", JSON.stringify(newCart));
        this.setTotalCartItems(newCart);
      }else{
        let newP = new CartItem(product, quantity);
        cart.push(newP);
        this.setTotalCartItems(cart);
        this.setTotalItems(cart.length);
      }
    }else{
      let cart: CartItem[] = [];
      cart.push(new CartItem(product, quantity));
      localStorage.setItem("cart", JSON.stringify(cart));
      this.setTotalCartItems(cart);
      this.setTotalItems(quantity);
    }
    // this.setViewCart(true);
  }

  deleteProduct(product: CartItem){
    let newCart = this.getCart().filter(item => item.product.productId !== product.product.productId);
    localStorage.setItem("cart", JSON.stringify(newCart));
    this.setTotalCartItems(newCart);
    if (newCart !== null)
    this.setTotalItems(newCart.length);
  }

  deleteCart(){
    localStorage.setItem("cart", JSON.stringify([]));
    this.setTotalCartItems([]);
    this.setTotalItems(0);
  }

  plusQuantity(cartItem: CartItem) {
    let newCart = this.getCart().filter(item => item.product.productId !== cartItem.product.productId);
    let item: CartItem = new CartItem(cartItem.product, cartItem.quantity + 1);
    newCart.push(item);
    localStorage.setItem("cart", JSON.stringify(newCart));
    this.setTotalCartItems(newCart);
  }
  minusQuantity(cartItem: CartItem) {
    let newCart = this.getCart().filter(item => item.product.productId !== cartItem.product.productId);
    let item: CartItem = new CartItem(cartItem.product, cartItem.quantity - 1);
    newCart.push(item);
    localStorage.setItem("cart", JSON.stringify(newCart));
    this.setTotalCartItems(newCart);
  }

  updateTotalPrice(cartItem: CartItem[]): number{
    let total = 0;
    if (cartItem !== null){
      cartItem.forEach(item => {
        total += item.product.productNewPrice*item.quantity;
      })
    }
    return total;
  }

  createOrder(order: any): void{
    this.afs.collection<any>("order").add(order);
  }


}
