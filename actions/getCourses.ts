import { Course } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getCourses = async (): Promise<Course[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default getCourses;
