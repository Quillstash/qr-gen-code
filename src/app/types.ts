export interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
  }
  
  export interface ProdReview {
    rating: string;
    comment: string;
    
  }
  
  export interface SubmittedReview extends Review {
    product: Product;
  }
  
  export interface Restaurant {
    id: string;
    name: string;
    logo: string;
  }
  
  export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image?:string
  }
  
  export interface Review {
    id?: string;
    rating: string;
    comment: string;
    menuItemId?: string;
    selectedItem? : string;
    reviewType?: string
  }
  
  export interface Complaint {
    id?: string;
    type?: string;
    description: string;
    complaintType:string
  }
