import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
} from "@nextui-org/react";

interface Product {
  id: number;
  category: number;
  attributes: Attribute[];
  name: string;
  description: string;
  price: string;
}

interface Attribute {
  attribute_name: string;
  value: string;
}

async function getData() {
  const res = await fetch("http://127.0.0.1:8000/products/");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {data.map((product: Product) => (
        <Card
          shadow="sm"
          key={product.id}
          isPressable
          //onPress={() => console.log("item pressed")}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={product.name}
              className="w-full object-cover h-[140px]"
              src={product.image}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{product.name}</b>
            <p className="text-default-500">{product.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
