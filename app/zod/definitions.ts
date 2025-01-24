import { date, z } from "zod";

export const SignupFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  full_name: z
    .string()
    .min(2, { message: "Please enter a valid name." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const SigninFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const CourseInfo = z.object({
  title: z
    .string()
    .min(2, { message: "Please enter a title longer than 2 characters." })
    .trim(),
  location: z.string({ message: "Please enter a valid location." }),
  description: z
    .string()
    .min(10, { message: "Please enter a valid description." })
    .trim(),
  date: z.object({
    from: date({
      message: "Please enter a valid from date.",
    }),
    to: date({
      message: "Please enter a valid to date.",
    }),
  }),
  price: z.number().int().positive().max(10000),
  imageSrc: z
    .object({})
    .array()
    .nonempty({ message: "Please upload an image." }),

  capacity: z
    .number()
    .int()
    .positive({ message: "Please input the course capacity" })
    .max(1000),
  category: z
    .string({ message: "Choose A Valid Category" })
    .min(2, { message: "Please choose a valid category." }),
});

export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type SendResetLinkFormState =
  | {
      errors?: {
        email?: string[];
      };
      message?: string;
    }
  | undefined;
