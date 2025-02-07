import { createClient } from "@/app/utils/supabase/server";

type GetAllCoursesParams = {
  query?: string;
  limit?: number;
  page?: number;
  category?: string;
};

export const getAllCourses = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  return {
    data: JSON.parse(JSON.stringify(data)),
  };
};

export const getFilteredCourses = async (city: string, category: string) => {
  const supabase = await createClient();
  const conditions = {};

  const { data, error } = await supabase
    .from("courses")
    .select("*")

    .ilike("location", `%${city}%`)
    .ilike("category", `%${category}%`);

  if (error) {
    console.log(error);
  }

  return {
    data: JSON.parse(JSON.stringify(data)),
  };
};
