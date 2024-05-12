import { signIn } from "@/auth";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

export default function FormSignIn() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("credentials", formData);
      }}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h1 className="mb-4 font-bold text-xl">Iniciar sesión</h1>

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
        Inciar sesión
      </Button>

      <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
        ¿Aú no tienes una cuenta?
        <Link
          href="/auth/signup"
          className="font-medium text-primary-600 hover:underline dark:text-primary-50"
        >
          Registrese
        </Link>
      </p>
    </form>
  );
}
