import Stripe from "stripe";
export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface Course {
  category: string;
  location: string;
  date: string;
  capacity: string;
  imageSrc: string;
  price: string;
  title: string;
  description: string;
}
