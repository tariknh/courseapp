"use client";
import { login, resetPassword, signInWithGithub, signup } from "./actions";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useState } from "react";
import { FaGithub } from "react-icons/fa";
// export function LoginPage0() {
//   return (
//     <form className="h-screen pt-[12vh]">
//       <label htmlFor="email">Email:</label>
//       <input id="email" name="email" type="email" required />
//       <label htmlFor="password">Password:</label>
//       <input id="password" name="password" type="password" required />
//       <button formAction={login}>Log in</button>
//       <button formAction={signup}>Sign up</button>
//     </form>
//   );
// }

const ForgotPasswordSection = ({
  handleForgotChange,
}: {
  handleForgotChange: () => void;
}) => {
  const [state, action, pending] = useActionState(resetPassword, undefined);

  return (
    <form action={action}>
      <div className="w-full lg:grid lg:min-h-screen h-[90vh] pt-[10vh] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Reset password</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to reset your password
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              {/* {state?.errors?.email && <p>{state.errors.email}</p>} */}

              <Button aria-disabled={pending} type="submit" className="w-full">
                {pending ? "Requesting password reset..." : "Reset password"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={handleForgotChange}
              >
                Log In
              </span>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <Image
            src="/class.jpg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </form>
  );
};

const LoginSection = ({
  handleLoginChange,
  handleForgotChange,
}: {
  handleLoginChange: () => void;
  handleForgotChange: () => void;
}) => {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action}>
      <div className="w-full lg:grid lg:min-h-screen h-[90vh] pt-[10vh] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              {state?.errors?.email && <p>{state.errors.email}</p>}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href={""}
                    onClick={handleForgotChange}
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              {state?.errors?.password && (
                <div>
                  <p className="text-destructive">Wrong password</p>
                </div>
              )}
              {state?.errors?.email && (
                <div>
                  <p className="text-destructive">Wrong email</p>
                </div>
              )}
              <Button aria-disabled={pending} type="submit" className="w-full">
                {pending ? "Logging in..." : "Log In"}
              </Button>
              <Button
                onClick={async () => await signInWithGithub()}
                variant="outline"
                className="w-full flex gap-2"
              >
                <FaGithub />
                Login with Github
              </Button>
              {/* Add Google login */}
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={handleLoginChange}
              >
                Sign Up
              </span>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <Image
            src="/class.jpg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </form>
  );
};

const SignupSection = ({
  handleLoginChange,
}: {
  handleLoginChange: () => void;
}) => {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form
      onSubmit={
        pending
          ? (event) => {
              event.preventDefault();
            }
          : undefined
      }
      action={action}
    >
      <div className="w-full h-[90vh] lg:grid lg:min-h-screen pt-[10vh] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <p className="text-balance text-muted-foreground">
                Create an account and get started!
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Full Name</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="Tim Apple"
                  required
                />
              </div>

              {state?.errors?.full_name && (
                <p className="text-destructive">{state.errors.full_name}</p>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tim@apple.com"
                  required
                />
              </div>
              {state?.errors?.email && (
                <p className="text-destructive">{state.errors.email}</p>
              )}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              {state?.errors?.password && (
                <p className="text-destructive">
                  Password must:{" "}
                  {state.errors.password.map((error, key) => (
                    <p key={key}>{error}</p>
                  ))}
                </p>
              )}

              <Button aria-disabled={pending} type="submit" className="w-full">
                {pending ? "Signing up..." : "Sign Up"}
              </Button>
              <Button variant="outline" className="w-full">
                Sign up with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={handleLoginChange}
              >
                Login
              </span>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <Image
            src="/class.jpg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </form>
  );
};

export default function AuthPage() {
  const [isLogin, setisLogin] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const handleLoginChange = () => {
    setisLogin(!isLogin);
  };
  const handleForgotChange = () => {
    setForgotPassword(!forgotPassword);
  };

  return (
    <section>
      {forgotPassword ? (
        <ForgotPasswordSection handleForgotChange={handleForgotChange} />
      ) : isLogin ? (
        <div>
          <LoginSection
            handleForgotChange={handleForgotChange}
            handleLoginChange={handleLoginChange}
          />
        </div>
      ) : (
        <SignupSection handleLoginChange={handleLoginChange} />
      )}
    </section>
  );
}
