export interface OrderProduct {
  product: string;
  quantity: number;
}

export interface Order {
  _id: string;
  products: OrderProduct[];
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  products: OrderProduct[];
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface CreateOrderResponse {
  status: number;
  message: string;
  data: Order;
}