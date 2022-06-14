import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fix-content',
  templateUrl: './fix-content.component.html',
  styleUrls: ['./fix-content.component.scss']
})
export class FixContentComponent implements OnInit {

  infoShop = {
    phone: '0387333535',
    linkFanpage: 'https://www.facebook.com/thucphamtiemnhabom/',
    linkMessage: 'm.me/thucphamtiemnhabom',
    linkGoogleMap: 'https://goo.gl/maps/acYRan4oW4XmuKc47'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
