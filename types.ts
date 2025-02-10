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

export interface CourseTypes {
  listingId: any;
  stripeId: string;
  id: number;
  category: string;
  location: string;
  date: {
    from: any;
    to: any;
  };
  capacity: string;
  imageSrc: string;
  price: number;
  title: string;
  description: string;
  isFree: boolean;
  user: string;
}
