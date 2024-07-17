"use client";
import { login, signup, signInWithGithub } from "./actions";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useActionState, useState } from "react";
import { set } from "date-fns";
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

const LoginSection = ({
  handleLoginChange,
}: {
  handleLoginChange: () => void;
}) => {
  const [state, action, pending] = useActionState(login, undefined);
  console.log(handleLoginChange);

  return (
    <form action={action}>
      <div className="w-full lg:grid lg:min-h-screen h-screen pt-[10vh] lg:grid-cols-2 xl:min-h-[800px]">
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
                    href="/forgot-password"
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
                onClick={() => signInWithGithub()}
                variant="outline"
                className="w-full"
              >
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
      <div className="w-full lg:grid lg:min-h-screen h-screen pt-[10vh] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
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
                  placeholder="m@example.com"
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
                {pending ? "Logging in..." : "Sign Up"}
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
                Sign up
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
  const handleLoginChange = () => {
    setisLogin(!isLogin);
  };

  return (
    <section>
      {isLogin ? (
        <div>
          <LoginSection handleLoginChange={handleLoginChange} />
        </div>
      ) : (
        <SignupSection handleLoginChange={handleLoginChange} />
      )}
    </section>
  );
}
