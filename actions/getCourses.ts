import { createClient } from "@/app/utils/supabase/server";

type GetAllCoursesParams = {
  query?: string;
  limit?: number;
  page?: number;
  category?: string;
};

// export const getCourses = async (): Promise<Course[]> => {
//   const supabase = createClient();

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
  // const supabase = createServerComponentClient({
  //   cookies: cookies,
  // });

  const supabase = createClient();
  const conditions = {};

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
  }

  return {
    data: JSON.parse(JSON.stringify(data)),
  };
  
};

export const getFilteredCourses = async (city:string,category:string) => {
  // const supabase = createServerComponentClient({
  //   cookies: cookies,
  // });

  

  const supabase = createClient();
  const conditions = {};

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .ilike('category', category)
    
  if (error) {
    console.log(error);
  }

  return {
    data: JSON.parse(JSON.stringify(data)),
  };
};
