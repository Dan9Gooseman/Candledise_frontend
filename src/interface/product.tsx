export default interface IProduct {
  _id: string;
  title:string;
  description: string;
  price: number;
  stock: number;
  active: boolean;
  thumbnail: string;
  category: {
    _id:string;
    name:string;
    createdAt: string;
    updatedAt: string;
  };
  __v: number;
}
