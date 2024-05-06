"use client";

import { FormEvent } from "react";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

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

    console.log("fetch login: ", res);

    if (res?.ok) {
      console.log("logueado con exito");
      toast("mi toast!");
    } else {
      console.log(res?.error || "Error desconocido");
      toast(res?.error || "Error desconocido");
    }
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
  }
}

export default function SignUp() {
  return (
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
    </form>
  );
}
