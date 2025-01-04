import Modal from "./Modal";

import { redirect } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { toast } from "sonner";
import { createClient } from "@/app/utils/supabase/server";

const AuthModal = async () => {
  const supabase = await createClient();
  const { onClose, isOpen } = useAuthModal();

  const { data, error } = await supabase.auth.getUser();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Modal
      title="Welcome"
      description="Log in or Create an account"
      isOpen={isOpen}
      onChange={() => {}}
      onSubmit={() => {}}
    >
      <Auth
        supabaseClient={supabase}
        theme="dark"
        providers={["github"]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#2e2e2e",

                brandAccent: "#90A1EE",
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
