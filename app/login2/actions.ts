"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/app/utils/supabase/server";
import { toast } from "sonner";

import {
  SignupFormSchema,
  FormState,
  SigninFormSchema,
} from "@/app/lib/definitions";

export async function login(state: FormState, formData: any) {
  const supabase = createClient();

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

export async function signup(state: FormState, formData: any) {
  const supabase = createClient();

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
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
        first_name: validatedFields.data.first_name,
        last_name: validatedFields.data.last_name,
      },
    },
  });

  if (error) {
    redirect("/error");
  }

  console.log(error);

  revalidatePath("/", "layout");

  redirect("/profile");
}

export async function oldLogin(state: any, formData: FormData) {
  const supabase = createClient();

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

export async function logout() {
  const supabase = createClient();
  console.log("logging out");

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

// export async function signup(formData: FormData) {
//   const supabase = createClient();

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
