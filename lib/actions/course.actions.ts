"use server";
import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

type GetOrganizedCoursesParams = {
  query: string;
  limit?: number;
  page: number;
  category?: string;
  user: string;
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

  if (data === null) {
    return {
      name: "Unknown",
      id: id,
    };
  }
  return {
    name: data[0]?.full_name,
    id: id,
  };
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
