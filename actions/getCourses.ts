import { createClient } from "@/app/utils/supabase/server";

type GetAllCoursesParams = {
  query?: string;
  limit?: number;
  page?: number;
  category?: string;
};

// export const getCourses = async (): Promise<Course[]> => {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .from("courses")
//     .select("*")
//     .order("created_at", { ascending: false });
//   if (error) {
//     console.log(error);
//   }

//   return (data as any) || [];
// };

export const getAllCourses = async () => {
  const start = performance.now(); // Start timing
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  const duration = performance.now() - start; // Calculate query duration

  return {
    data: JSON.parse(JSON.stringify(data)),
    duration,
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
