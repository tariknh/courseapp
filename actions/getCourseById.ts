import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface IParams {
  course?: string;
  listingId?: string;
}

const getCourseById = async (params: IParams) => {
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
