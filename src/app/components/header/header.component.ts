import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private elem: ElementRef,
              private _cartService: CartService) { }
  @Input() visibleSidebar: boolean = false;
  totalItems: number = 0;

  ngOnInit(): void {
    this._cartService.viewCartValue.subscribe(
      (data) => {
        this.visibleSidebar = data;
      }
    )
    this._cartService.TotalItems.subscribe(
      (data) => {
        this.totalItems = data;
      }
    )
  }
  visibileBtn(){
    let fadeElems = this.elem.nativeElement.querySelectorAll(".has-fade")
    let header = this.elem.nativeElement.querySelector('.header');
    let overlay = this.elem.nativeElement.querySelector(".overlay");

    if (header.classList.contains("open")){

      header.classList.remove("open")
      overlay.classList.remove("fade-in")
      overlay.classList.add("fade-out")
      fadeElems.forEach(function (element: any){
        element.classList.remove("fade-in")
        element.classList.add("fade-out")
      })
    }else{

      header.classList.add("open")
      overlay.classList.remove("fade-out")
      overlay.classList.add("fade-in")
      fadeElems.forEach(function (element: any){
        element.classList.remove("fade-out")
        element.classList.add("fade-in")
      })
    }
  }
  viewCart() {
    // this.visibleSidebar = true;
    this._cartService.setViewCart(true);

  }
  hiddenCart(){
    this._cartService.setViewCart(false);

  }


}
