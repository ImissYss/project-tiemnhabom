import { Component, OnInit } from '@angular/core';
import {NavigatorService} from "../../service/navigator.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

  constructor(private _navigator: NavigatorService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  backToPreviousPage(){
    this._router.navigate(["/"]);
  }

}
