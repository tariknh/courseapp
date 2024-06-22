import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (course: any) => {
  const supabaseClient = useSupabaseClient();
  if (!course) return null;
  const images = JSON.parse(course.imageSrc);

  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(images[0].uid);

  return imageData.publicUrl;
};

export default useLoadImage;
