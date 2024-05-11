"use client";
import { useDrawer } from "@/app/providers";
import CartIcon from "@/icons/CartIcon";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function ButtonsCart() {
  const { toggleDrawer } = useDrawer();
  return (
    <div className="flex gap-4 items-center">
      <Button
        color="primary"
        variant="bordered"
        endContent={<CartIcon />}
        onClick={toggleDrawer}
      >
        Añadir a la cesta
      </Button>
      <Button color="primary" href="/cart" as={Link}>
        Comprar
      </Button>
    </div>
  );
}
