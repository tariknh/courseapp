"use server";
import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Stripe from "stripe";

type GetOrganizedCoursesParams = {
  query: string;
  limit?: number;
  page: number;
  category?: string;
  user: string;
};
type GetRelatedCoursesParams = {
  limit?: number;
  category: string;
  page?: number;
  currentEvent: string;
};
type OrderParams = {
  buyer: string;
  title: string;
  price: number;
  listingId: number;
};

type GetTicketsParams = {
  query: string;
  limit?: number;
  page: number;
  category?: string;
  user: string;
};

type DeleteCourseParams = {
  courseId: number;
  path: string;
};

export const getNameById = async (id: any) => {
  const supabase = createClient();

  const { data, error } = await supabase.from("users").select("*").eq("id", id);
  if (data) {
    const { full_name } = data[0];

    return {
      name: full_name,
      id: id,
    };
  }

  if (data === null) {
    return {
      name: "Unknown",
      id: id,
    };
  }
};

export const deleteCourse = async ({ courseId, path }: DeleteCourseParams) => {
  try {
    const supabase = createClient();

    const deleteCourse = await supabase
      .from("courses")
      .delete()
      .eq("id", courseId);

    if (deleteCourse) {
      revalidatePath("/courses");
      return true;
    }
  } catch (error) {
    console.log(error, "Error deleting event");
  }
};

export const createOrder = async (order: any) => {
  try {
    const supabase = createClient();

    const newOrder = await supabase.from("orders").insert({
      stripeId: order.stripeId,
      listingId: order.listingId,
      buyer: order.buyer,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,
    });
    console.log("inserted:", newOrder);
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log(error, "Error deleting event, attempted to input:", order);
  }
};

export const checkoutOrder = async (order: OrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const price = Number(order.price) * 100;
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: order.title,
            },
          },
          quantity: 1,
        },
      ],
      metadata: { listingId: order.listingId, buyer: order.buyer },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });
    redirect(session.url!);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRelatedEvents = async ({
  limit = 6,
  page,
  category,
  currentEvent,
}: GetRelatedCoursesParams) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("category", category)
      .neq("id", currentEvent)
      .limit(limit);

    if (data !== null) {
      return {
        data: data,
        totalPages: Math.ceil(data.length / limit),
      };
    } else {
      // Handle the case when data is null
      return {
        data: [],
        totalPages: 0,
      };
    }
  } catch (error) {
    console.log(error, "Error fetching organized courses");
    return {
      data: [],
      totalPages: 0,
    };
  }
};

export const getOrganizedCourses = async ({
  query,
  limit = 6,
  page,
  category,
  user,
}: GetOrganizedCoursesParams) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("user", user)
      .limit(limit);

    if (data !== null) {
      return {
        data: data,
        totalPages: Math.ceil(data.length / limit),
      };
    } else {
      // Handle the case when data is null
      return {
        data: [],
        totalPages: 0,
      };
    }
  } catch (error) {
    console.log(error, "Error fetching organized courses");
    return {
      data: [],
      totalPages: 0,
    };
  }
};
export const getTickets = async ({
  query,
  limit = 6,
  page,
  category,
  user,
}: GetTicketsParams) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("user", user)
      .limit(limit);

    if (data !== null) {
      return {
        data: data,
        totalPages: Math.ceil(data.length / limit),
      };
    } else {
      // Handle the case when data is null
      return {
        data: [],
        totalPages: 0,
      };
    }
  } catch (error) {
    console.log(error, "Error fetching organized courses");
    return {
      data: [],
      totalPages: 0,
    };
  }
};
