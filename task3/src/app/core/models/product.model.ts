export class Product {
    constructor(
      public id: string,
      public title: string,
      public price: string,
      public description: string,
      public category: string,
      public image: string,
      public quantity?: number
    ) {}
}

export class ProductCart {
  constructor(
    public userId:number,
    public date: Date,
    public products?: {productId:number,quantity:number}[],
    public id?: number
  ) {}
}