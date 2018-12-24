export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface LineItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
}

type DiscountType = 'percent' | 'nominal';

export interface Discount {
  code: string;
  amount: number;
  type: DiscountType;
}

export interface Cart {
  id: string;
  lineItems: Array<LineItem>;
}

export as namespace Entities;
