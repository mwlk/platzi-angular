export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  taxes?: number;
}

export interface CreateProductDTO extends Omit<Product, 'id'> {}

export interface UpdateProductDto extends Partial<CreateProductDTO> {}
