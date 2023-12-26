import { Course } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface IParams {
  course?: string;
  listingId?: string;
}

const getCourseById = async (params: IParams) => {
  console.log(params);
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", params.course)
    .single();
  if (error) {
    console.log(error);
  }

  if (!data) {
    return null;
  }

  return data;
};

export default getCourseById;
