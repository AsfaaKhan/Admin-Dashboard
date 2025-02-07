// types/Product.ts
export interface Product {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    description: string;
    imageUrl: string;
    price: number;
    tags: string[];
    dicountPercentage?: number;
    isNew?: boolean;
    inventory?: number;
    category: {
      title: string;
    };
  }
  