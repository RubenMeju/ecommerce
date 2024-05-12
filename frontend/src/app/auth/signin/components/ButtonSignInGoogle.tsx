import { signIn } from "@/auth";
import { Button } from "@nextui-org/react";

export default function ButtonSignInGoogle() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit" color="primary">
        Signin with Google
      </Button>
    </form>
  );
}
