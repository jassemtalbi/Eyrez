export const ORDER_STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type OrderItem = {
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  size: string;
  color: string;
  qty: number;
};

export type Customer = {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  governorate: string;
  notes?: string;
};

export type AdminUser = {
  username: string;
  passwordHash: string;
  createdAt: string;
};

export type Order = {
  id: string;
  number: string;
  createdAt: string;
  status: OrderStatus;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
};
