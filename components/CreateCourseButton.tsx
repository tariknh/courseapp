"use client";
import useUploadModal from "@/hooks/useCourseModal";
import { usePathname, useRouter } from "next/navigation";
import { getSession } from "@/app/login2/actions";

const CreateCourseButton = (sessionProps: any) => {
  const { session } = sessionProps;

  const uploadModal = useUploadModal();
  const pathname = usePathname();
  const router = useRouter();

  const openCourseModal = () => {
    if (session.session === null) {
      return router.push("/login2");
    }
    if (pathname !== "/courses") {
      router.push("/courses");
    }

    uploadModal.onOpen();
  };
  return (
    <span onClick={() => openCourseModal()} className="cursor-pointer">
      Create a listing
    </span>
  );
};

export default CreateCourseButton;
