import CartIcon from "@/icons/CartIcon";
import { useDrawer } from "../providers";

export default function DrawerCart() {
  const { toggleDrawer, isOpen } = useDrawer();
  return (
    <>
      <button onClick={toggleDrawer}>
        <CartIcon />
      </button>

      {isOpen && (
        <div className="fixed top-0 left-0 z-50 bg-slate-100">
          <div className="h-20 w-4/5 m-auto flex justify-between items-center">
            <p className="text-xl font-bold">Mí carrito</p>
            <button onClick={toggleDrawer}>X</button>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            ea aliquid similique, magni tempore necessitatibus nam dolore, sit
            esse omnis unde, quas nemo maiores sunt. Voluptatibus sint
            consequuntur nulla illo.
          </p>
        </div>
      )}
    </>
  );
}
