import { createClient } from "@/app/utils/supabase/server";
import CourseModal from "@/components/CourseModal";

async function ModalProvider() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log(error, "ERRORE", data, "NOERRORE");
  return (
    <>
      {/* <AuthModal /> */}
      <CourseModal props={data} />
    </>
  );
}

export default ModalProvider;
