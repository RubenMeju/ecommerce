// providers.tsx
"use client";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { createContext, useContext, useState } from "react";

const DrawerContext = createContext<{
  isOpen: boolean;
  toggleDrawer: () => void;
}>({
  isOpen: false,
  toggleDrawer: () => {},
});

export const useDrawer = () => useContext(DrawerContext);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NextUIProvider>
      <SessionProvider>
        <DrawerContext.Provider value={{ isOpen, toggleDrawer }}>
          {children}
        </DrawerContext.Provider>
      </SessionProvider>
    </NextUIProvider>
  );
};
