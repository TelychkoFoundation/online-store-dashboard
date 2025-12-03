export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductMutationPayload {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export interface UpdateProductPayload extends ProductMutationPayload {
  id: number;
}
