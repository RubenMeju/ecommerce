import { auth } from "@/auth";
import { Image } from "@nextui-org/react";

export default async function Profile() {
  const session = await auth();
  console.log(session);
  if (!session?.user) return null;

  return (
    <div>
      <p>{session.user.name}</p>

      <p>{session.user.email}</p>
      {session?.user?.image && (
        <Image width={100} alt="Imagen de perfil" src={session.user.image} />
      )}
    </div>
  );
}
