
import { client } from "@/sanity/lib/client";
import { Product } from "@/types/Product";
import Link from "next/link";
import { notFound } from "next/navigation";


interface OrderPageProps {
  params: 
  {productId : string};
}

export default async function OrderDetailPage({
  params,
}: OrderPageProps) {
  const { productId } =  params;

  // Fetch the order data from Sanity based on orderId
  const product: Product  = await client.fetch(`*[_type == "product" && slug.current == $productId][0]{
        _id,
        title,
        slug,
        description,
        imageUrl,
        price,
        tags,
        dicountPercentage,
        isNew,
        inventory,
      }`,
    { productId }
  );
console.log(product);

  if (!product) {
    // If no order is found, show a 404 page.
    notFound();
  }



  return (
    <div className="container mx-auto p-4">
      <Link href="../">
        <button className="mb-4 bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded">
          Back to Dashboard
        </button>
      </Link>
      <h1 className="text-3xl font-bold my-6 ">Order Details</h1>

      <div className="bg-white shadow-md p-4 rounded">
        <h2 className="mt-4 text-xl sm:text-2xl font-extrabold border-b-2  mb-5">Customer Detail:</h2>

        <p className="font-bold flex gap-2">
          <strong >Customer Name:</strong> {product.title} 
        </p>
        <p className="font-bold ">
          <strong>Address:</strong>  {product.tags}
        </p>
        
      </div>
    </div>
  );
}


{/* <p className="font-bold gap-2">
          <strong>Phone:</strong> {order.phone}
        </p>
        <p className="font-bold">
          <strong>Email:</strong> {order.email}
        </p>
        <p className="font-bold">
          <strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
        </p>
        <h2 className="mt-7 text-xl sm:text-2xl font-extrabold border-b-2 mb-5">Product Detail:</h2>
        <ul>
          {order.cartItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2 my-2">
              <div className="flex flex-col gap-3">
                {item.imageUrl && (
                  <Image
                    src={urlFor(item.imageUrl).url()}
                    alt={item.title}
                    width={50}
                    height={50}
                  />
                )}
                <p className="flex gap-2 font-bold"> <strong>Item:</strong>{item.title}</p>

                <p className="flex gap-2 font-bold"> <strong>Total Amount:</strong>${order.total}</p>
                <p className="flex gap-2 font-bold"> <strong>Status:</strong>${order.status}</p>
              </div>
            </li>
          ))}
        </ul> */}