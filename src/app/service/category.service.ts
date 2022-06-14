import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {Product} from "../model/product";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afs: AngularFirestore) { }

  getCategories(): Observable<any>{
    return this.afs.collection<Product>("category")
      .snapshotChanges()
      .pipe(map((changes: any) => changes.map((c:any) => ({
        categoryId: c.payload.doc.id,
        ... c.payload.doc.data()
      }))))
  }
}
