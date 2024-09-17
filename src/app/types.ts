export interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
  }
  
  export interface Review {
    rating: string;
    comment: string;
  }
  
  export interface SubmittedReview extends Review {
    product: Product;
  }
  