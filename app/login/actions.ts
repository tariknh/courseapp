"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/app/utils/supabase/server";

import {
  FormState,
  SigninFormSchema,
  SignupFormSchema,
} from "@/app/zod/definitions";
import { sendSignUpEmail } from "@/lib/actions/course.actions";
import { toast } from "sonner";

export async function login(state: FormState, formData: any) {
  const supabase = await createClient();

  // Validate form fields
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db to create a user...
  const { error } = await supabase.auth.signInWithPassword({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  });

  if (error) {
    redirect("/error");
  }

  console.log(error);

  revalidatePath("/", "layout");

  redirect("/profile");
}

export async function resetPassword(state: void | undefined, formData: any) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.resetPasswordForEmail(
    formData.get("email"),
    {
      redirectTo: "/login",
    }
  );
}

export async function signup(state: FormState, formData: any) {
  const supabase = await createClient();

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    full_name: formData.get("full_name"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db to create a user...
  const { data, error } = await supabase.auth.signUp({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    options: {
      data: {
        full_name: validatedFields.data.full_name,
      },
    },
  });

  if (error) {
    console.log(error, "Signuperror")
    redirect("/error");
  }
  toast.success("Signup success, please check your email!")
  redirect("/profile");
}

export async function oldLogin(state: any, formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = SignupFormSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!data.success) {
    return {
      errors: data.error.flatten().fieldErrors,
    };
  }

  /*
 const data = {
  email: formData.get("email") as string,
  password: formData.get("password") as string,
};

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");

  redirect("/profile");
  */
}

export async function signInWithGithub() {
  const supabase = await createClient();
  const redirectUrl = "http://localhost:3000/auth/callback";
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    redirect("/login?message=Could not authenticate with Github");
  }
  return redirect(data.url);
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function getSession() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return redirect("/login");
  }
  return data;
}

// export async function signup(formData: FormData) {
//   const supabase = await createClient();

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//   };

//   const { error } = await supabase.auth.signUp(data);

//   if (error) {
//     redirect("/error");
//   }

//   revalidatePath("/", "layout");
//   redirect("/");
// }
