import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
//import { toast } from "react-toastify";

export default function SignUp() {
  async function createUser(formData: FormData) {
    "use server";
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const repassword = formData.get("repassword");

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          re_password: repassword,
        }),
      });
      console.log(await res.json());
      /*
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
  return (
    <div className="w-full h-[calc(100vh-4rem)] flex justify-center items-center">
      <form
        action={createUser}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h1 className="mb-4 font-bold text-xl">Crear cuenta</h1>
        <div className="mb-4">
          <Input
            type="text"
            name="username"
            label="Username"
            placeholder="Enter your username"
            isRequired
          />
        </div>
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

        <div className="mb-4">
          <Input
            type="password"
            name="repassword"
            label="Confirm password"
            placeholder="Confirm your password"
            isRequired
          />
        </div>
        <Button type="submit" color="primary" className="w-full">
          Registrarse
        </Button>

        <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
          ¿Ya tienes una cuenta?
          <Link
            href="/auth/signin"
            className="font-medium text-primary-600 hover:underline dark:text-primary-50"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
