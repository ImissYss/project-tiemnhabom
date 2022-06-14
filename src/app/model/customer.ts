export class Customer{
  customerId: string;
  customerName: string;
  customerPhone: string;
  province: string;
  district: string;
  warn: string;
  detail: string;
   constructor(customerName: string, customerPhone: string, province: string, district: string, warn: string, detail: string) {
     this.customerName = customerName;
     this.customerPhone = customerPhone;
     this.province = province;
     this.district = district;
     this.warn = warn;
     this.detail = detail;
   }
}
