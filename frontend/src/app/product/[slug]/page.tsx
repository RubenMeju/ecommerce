import { Attribute } from "@/app/page";
import CartIcon from "@/icons/CartIcon";
import { Button, Image, Link } from "@nextui-org/react";

async function getProductBySlug(slug: string) {
  const res = await fetch(`http://127.0.0.1:8000/products/?slug=${slug}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }: { params: { slug: string } }) {
  const [product] = await getProductBySlug(params.slug);
  const { id, name, description, image, price, attributes } = product;

  return (
    <div className="p-4 max-w-5xl m-auto">
      <Image width={300} alt={`Imagen ${name}`} src={image} />

      <div className="mt-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{name}</h1>
        <span>{price}</span>
      </div>

      <p className="mt-4 mb-4">{description}</p>

      <div>
        <p className="text-lg font-semibold">Acerca de este producto</p>
        {attributes.map((attribute: Attribute, index: number) => (
          <div key={index} className="flex gap-2">
            <p>{attribute.attribute_name}:</p>
            <p>{attribute.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 items-center">
        <Button color="primary" variant="bordered" endContent={<CartIcon />}>
          Añadir a la cesta
        </Button>
        <Button color="primary" href="/cart" as={Link}>
          Comprar
        </Button>
      </div>
    </div>
  );
}
