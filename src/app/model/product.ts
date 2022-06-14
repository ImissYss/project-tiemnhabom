import {Category} from "./category";
import {Description} from "./description";
import {MetaTags} from "./metaTags";
import {MetaTagNames} from "./metaTagNames";

export class Product{
  productId: string;
  productName: string;
  productImage: string[];
  productOldPrice: number;
  productNewPrice: number;
  productDescription: Description[];
  category: Category;
  origin: string;
  weight: string;
  countBuy: number;
  countView: number;
  expiry: Date;
  packingStyle: string;
  titleSeo: string;
  metaTags: MetaTags[];
  metaTagNames: MetaTagNames[];
}
