import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  return <div>Profile</div>;
}
