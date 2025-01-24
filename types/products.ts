/*
export type Product = {
    _id: string;
    name: string; // Make sure this exists
    slug: {
      current: string;
    };
    image: any; // You might need to adjust this type if it's not 'any'
    category: string;
    colors: string[];
    price: number;
    slug : {
      _type: "slug";
      current : string;
    };
  };
  **/
  export interface Product {
    _id: string;
    productName: string;
    _type?: "product";
    image?: {
      asset: {
        _ref: string;
        _type: "image";
      };
    };
    price: number;
    description?: string;
    slug: {
      _type: "slug";
      current: string;
    };
    name?: string; // Add name if it's part of your data
    category?: string; // Add category if it's part of your data
    colors?: string[]; // Add colors as an optional array of strings

  }
  