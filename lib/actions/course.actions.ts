"use server";
import { createClient } from "@/app/utils/supabase/server";
import { EmailTemplate } from "@/components/Resend/email-template";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
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
  id?: number;
};

type GetTicketsParams = {
  query: string;
  limit?: number;
  page: number;
  category?: string;
  user: string;
};

type GetCourseByIdParams = {
  course: any;
};

type DeleteCourseParams = {
  courseId: number;
  path: string;
};

export async function updateListing(
  state: any | undefined,
  formData: FormData
) {
  //const res = await fetch('https://...')
  //const json = await res.json()
  try {
    const supabase = await createClient();

    const rawFormData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      date: formData.get("date"),
      location: formData.get("location"),
      capacity: formData.get("capacity"),
      price: formData.get("price"),
      amount: formData.get("amount"),
      status: formData.get("status"),
    };

    const { data, error } = await supabase
      .from("courses")
      .update({ title: rawFormData.title && rawFormData.title })
      .eq("id", formData.get("id"))
      .select();

    if (data) {
      revalidatePath("/");
      return true;
    }
  } catch (error) {
    console.log(error, "Error updating course");
  }
}

export const getNameById = async (id: any) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("users").select("*").eq("id", id);
  if (data) {
    const { full_name, useremail } = data[0];
    console.log(data[0], "datanull");

    return {
      name: full_name,
      id: id,
      email: useremail,
    };
  }

  if (data === null) {
    return {
      name: "Unknown",
      id: id,
    };
  }
};
export const undoCheckin = async (
  order: OrderParams,
  courseId: string,
  hasCheckedIn: any
) => {
  const supabase = await createClient();
  console.log(order, "USERID CHECKIN", courseId, "courseId CHECKIN");

  const { data, error } = await supabase
    .from("orders")
    .update({ has_checked_in: !hasCheckedIn })
    .eq("id", order.id)
    .select();
  return { data, error };
};

export const deleteCourse = async ({ courseId, path }: DeleteCourseParams) => {
  try {
    const supabase = await createClient();

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
    const supabase = await createClient();

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

export const sendSignUpEmail = async ({ userId }: { userId: string }) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: "Tarik <onboarding@resend.dev>",
    to: ["hajibtarik@gmail.com"],
    subject: "Thank you for signing up!",
    react: EmailTemplate({ firstName: "John" }) as React.ReactElement,
  });
  if (error) {
    return Response.json({ error }, { status: 500 });
  }
  return Response.json({ data });
};

export const getRelatedEvents = async ({
  limit = 6,
  page,
  category,
  currentEvent,
}: GetRelatedCoursesParams) => {
  const supabase = await createClient();

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

export const getCourseById = async (course: number) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", course)
      .single();

    if (data !== null) {
      return {
        data: data,
      };
    } else {
      // Handle the case when data is null
      return {
        data: [],
      };
    }
  } catch (error) {
    console.log(error, "Error fetching organized courses");
    return {
      data: [],
    };
  }
};

export const getOrdersByCourseId = async (courseId: string) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*, listingId(*)")
      .eq("listingId", courseId);

    if (data !== null) {
      //console.log(data, "orders by course id");
      return {
        ticketData: data,
      };
    } else {
      // Handle the case when data is null
      return {
        data: [],
      };
    }
  } catch (error) {
    console.log(error, "Error fetching orders");
    return {
      data: [],
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
  const supabase = await createClient();

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
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*, listingId(*)")
      .eq("buyer", user)
      .limit(limit);

    if (data !== null) {
      const extractedData = data.map((item) => {
        // Replace 'listingId' with the actual key or path to the nested object/array you want to extract
        return item.listingId;
      });

      return {
        data: extractedData,
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
