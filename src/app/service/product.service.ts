import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {Product} from "../model/product";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private afs: AngularFirestore) { }

  getProducts(): Observable<Product[]>{
    // return this.afs.collection<Product>("product").valueChanges();
    return this.afs.collection<Product>("product")
      .snapshotChanges()
      .pipe(map((changes: any) => changes.map((c:any) => ({
        productId: c.payload.doc.id,
        ... c.payload.doc.data()
      }))))
  }

  getProduct(productId: string): Observable<Product>{
    // return this.afs.doc<Product>(`product/${productId}`)
                    return this.afs.collection("product").doc(productId).snapshotChanges()
                    .pipe(map((action:any) => {
                    if (action.payload.exists === false){
                      return new Object as Product;
                    }else{
                      const data = action.payload.data() as Product;
                      data.productId = action.payload.id;
                      return data;
                    }
    }))

  }

  updateProduct(product: Product, productId: string): void{
    this.afs.collection("product").doc(productId).update(product);
  }

}
