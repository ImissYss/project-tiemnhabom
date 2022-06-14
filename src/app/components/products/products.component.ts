import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {ProductService} from "../../service/product.service";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {Category} from "../../model/category";
import {CategoryService} from "../../service/category.service";
import {Random} from "../../utils/random";
import {PaginationInstance} from "ngx-pagination";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productOrigin: Product[] = [];
  destroy$: Subject<void> = new Subject();

  page: any;
  maxSize = 9;

  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
  };

  // onPageChange(number: number) {
  //   this.config.currentPage = number;
  //   console.log(this.scrollPosition);
  // }
  //
  // onPageBoundsCorrection(number: number) {
  //   this.config.currentPage = number;
  // }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  visibleCategory: boolean = false;

  constructor(private _productService: ProductService,
              private router: Router,
              private _categoryService: CategoryService,
              private navigator: Router) {
    this._categoryService.getCategories().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.categories = data;
      }
    )
  }

  random: Random = new Random();

  ngOnInit(): void {
    this._productService.getProducts().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.products = data;
        this.products.forEach(i => {
          if (i.countBuy < 10){
            i.countBuy = this.random.getRandomInt(20,130);
          }
        })
        this.productOrigin = data;
      }
    )
  }

  navigatorProduct(p: Product){
    p.countView = p.countView + 1;
    this._productService.updateProduct(p, p.productId);
    this.navigator.navigate(['san-pham', p.productId]);
  }

  // scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  scrollPosition: any;

  categories: Category[] = []
  filterCategory(){
    this.visibleCategory = true;
  }
  actived: string = '0';
  selectProductOfCategory(category){
    this.scrollPosition = window.pageYOffset;
    this.products = this.productOrigin.filter(p => p.category.categoryName == category.categoryName);
    this.visibleCategory = false;
    this.actived = category.categoryName;
    if (this.scrollPosition > 1574){
      window.scroll({
        top: 1340,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
  selectProductOfCategory2(category){
    this.scrollPosition = window.pageYOffset;
    this.products = this.productOrigin.filter(p => p.category.categoryName == category.categoryName);
    this.visibleCategory = false;
    this.actived = category.categoryName;
    if (this.scrollPosition > 1000){
      window.scroll({
        top: 630,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
  selectAll(){
    this.scrollPosition = window.pageYOffset;
    this.actived = '0';
    this.products = this.productOrigin;
    if (this.scrollPosition > 1574){
      window.scroll({
        top: 1340,
        left: 0,
        behavior: 'smooth'
      });
    }
  }



}
