import IProduct from "./product";

export type CartItem = {
  product: IProduct;
  quantity: number;
};

export type Cart = {
  _id: string;
  user: string;
  products: CartItem[];
};
