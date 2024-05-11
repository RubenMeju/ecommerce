import { auth } from "@/auth";

export async function GET(request: Request) {
  const session = await auth();
  console.log("feo", session?.user);
  const res = await fetch("http://127.0.0.1:8000/cart/cart/");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
