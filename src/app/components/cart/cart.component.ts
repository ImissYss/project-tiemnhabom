import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {CartItem} from "../../model/cartItem";
import {CartService} from "../../service/cart.service";
import {ReadingJsonService} from "../../service/reading-json.service";
import {CustomerService} from "../../service/customer.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {OrderStatus} from "../../enums/orderStatus";
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  form: FormGroup;
  totalPrice: number = 0;
  ship: number = 0;
  type: string = 'VIEW'
  cartItem: CartItem[] = [];
  isSubmitted: boolean = false;
  isValid: boolean = true;


  tinh: string = '';
  huyen: string = '';
  xa: string = '';
  sonha: string = '';
  customerName: string = '';
  customerPhone: string = '';
  address: any;
  province: string[] = [];
  district: string[] = [];
  warn: string[] = [];
  notice: string;

  filterString: string = '';

  constructor(private _cartService: CartService,
              private _readingJSONService: ReadingJsonService,
              private _customerService: CustomerService,
              private _router: Router,
              private _productService: ProductService) {
    this._readingJSONService.getJSON().subscribe(
      (data) => {
        this.address = data;
      }
    )
  }
  ngOnInit(): void {
    this._cartService.setViewCart(false);
    this.cartItem = this._cartService.getCart();
    this._cartService.TotalCartItems.subscribe(
      (data) => {
        this.cartItem = data;
        this.totalPrice = this._cartService.updateTotalPrice(this.cartItem);
        if (this.totalPrice > 500000 || (this.totalPrice > 300000 && this.huyen.substring(0,4).toLowerCase() === 'quận')){
          this.ship = 0;
        }else  if (this.tinh.toLowerCase() === 'thành phố hà nội'){
          this.ship = 15000
        }else{
          this.ship = 0
        }
      }
    )
  }

  onSubmit(){

  }

  addressDialog:boolean = false;
  validDistrict: boolean = true;
  validWarn: boolean = true;
  chooseP: boolean = false;
  chooseD: boolean = false;
  chooseW: boolean = false;

  selectProvince(){
    this.addressDialog = true;
    this.chooseP = true;
    this.address.data.forEach(item => {
      this.province.push(item.name);
    })
  }

  selectDistrict(){
    this.addressDialog = true;
    this.chooseD = true;
    this.filterString = '';
  }


  selectWarn(){
    this.addressDialog = true;
    this.chooseW = true;
    this.filterString = '';

  }

  chooseProvince(province: any){
    if (this.tinh !== '' && this.tinh !== province){
      this.huyen = '';
      this.xa = '';
    }
    this.tinh = province;
    if (province.toLowerCase() == 'thành phố hà nội' && this.totalPrice < 500000){
      this.ship = 15000;
    }else if (province.toLowerCase() !== 'thành phố hà nội' && this.totalPrice < 500000){
      this.ship = 30000;
    }else{
      this.ship = 0;
    }
    this.chooseP = false;
    this.district = [];
    this.address.data.filter(item => item.name === this.tinh)[0].level2s.forEach(i => {
      this.district.push(i.name);
    })
    this.addressDialog = false;
    this.validDistrict = false;

  }
  chooseDistrict(district: any){

    if (this.huyen !== '' && this.huyen !== district){
      this.xa = ''
    }
    this.huyen = district;
    if (this.huyen.substring(0,4).toLowerCase() === 'quận' && this.totalPrice > 300000){
      this.ship = 0
    }
    this.chooseD = false;
    this.warn = [];
    this.address.data.filter(item => item.name === this.tinh)[0].level2s.filter(it => it.name === this.huyen)[0].level3s.forEach(i => {
      this.warn.push(i.name);
    })
    this.addressDialog = false;
    this.validWarn = false;

  }
  chooseWarn(warn: any){
    this.xa = warn;
    this.chooseW = false;
    this.addressDialog = false;
  }

  closeDialog(){
    this.addressDialog = false;
  }
  createOrder(){
    this.isSubmitted = true;
    if (this.tinh === '' || this.huyen === '' || this.xa === ''|| this.customerName === ''|| this.customerPhone === ''){
      this.isValid = false;
      Swal.fire({
        title: "Lỗi",
        text: "Bạn cần điền đầy đủ địa chỉ giao hàng",
        icon: "error"
      })
    }else {
      let customer = {
        customerName: this.customerName,
        customerPhone: this.customerPhone,
        province: this.tinh,
        district: this.huyen,
        warn: this.xa,
        detail: this.sonha
      }
      let newP: any[] = [];
      this.cartItem.forEach(item => {
        let it = {
          product: item.product,
          quantity: item.quantity
        }
        newP.push(it);
      })
      this._customerService.addCustomer(customer);
      let order = {
        customer: customer,
        products: newP,
        ship: this.ship,
        status: OrderStatus.NEW,
        notice: this.notice
      }
      this._cartService.createOrder(order);
      this.cartItem.forEach(
        i => {
          i.product.countBuy = i.product.countBuy + i.quantity;
          console.log(i.product);
          this._productService.updateProduct(i.product, i.product.productId);
        }
      )
      this._cartService.deleteCart();
      this._router.navigate(["dat-hang-thanh-cong"]);
    }
  }
  updateCart(){
    this.type = 'EDIT';
  }

  backToPreviousPage(){
    this._router.navigate(["/"])
  }

}
