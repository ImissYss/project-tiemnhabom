import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Customer} from "../model/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private afs: AngularFirestore) { }

  addCustomer(customer: any): void{
    this.afs.collection<any>("customer").add(customer);
  }
}
