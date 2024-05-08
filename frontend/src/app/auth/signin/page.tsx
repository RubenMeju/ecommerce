"use client";

import { FormEvent } from "react";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
//import { toast } from "react-toastify";
import Link from "next/link";

async function createToken(event: FormEvent<HTMLFormElement>) {
  event.preventDefault(); // Evitar que se recargue la página al enviar el formulario

  const formData = new FormData(event.currentTarget);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    /*

    console.log("fetch login: ", res);
    if (res?.ok) {
      toast("Sesión iniciada");
    } else {
      toast(res?.error || "Error desconocido");
    }
    */
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
  }
}

export default function SignIn() {
  return (
    <div className="w-full h-[calc(100vh-4rem)] flex justify-center items-center">
      <form
        onSubmit={createToken}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h1 className="mb-4 font-bold text-xl">Sign In</h1>
        <div className="mb-4">
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your email"
            isRequired
          />
        </div>

        <div className="mb-4">
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            isRequired
          />
        </div>
        <Button type="submit" color="primary" className="w-full">
          Iniciar sesión
        </Button>

        <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
          ¿Aún no tienes una cuenta?
          <Link
            href="/auth/signup"
            className="font-medium text-primary-600 hover:underline dark:text-primary-50"
          >
            Registrarse
          </Link>
        </p>
      </form>
    </div>
  );
}
