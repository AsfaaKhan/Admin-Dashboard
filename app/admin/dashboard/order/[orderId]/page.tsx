
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";


interface ICartItem {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageUrl: any;
}
// Define the interface for an order. Adjust fields as needed.
interface IOrder {
  _id: string;
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  total: number;
  discount: number;
  orderDate: number;
  status: string | null;
  cartItems: ICartItem[];
}

interface OrderPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderDetailPage({
  params,
}: OrderPageProps) {
  const { orderId } = await params;

  // Fetch the order data from Sanity based on orderId
  const order: IOrder | null = await client.fetch(
    `*[_type == "order" && _id == $orderId][0]{
        _id,
        firstName,
        lastName,
        phone,
        email,
        address,
        city,
        zipCode,
        total,
        discount,
        orderDate,
        status,
        cartItems[] -> { title, imageUrl }
      }`,
    { orderId }
  );

  if (!order) {
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
      <h1 className="text-3xl font-bold my-6 text-black">Order Details</h1>

      <div className="bg-white text-black shadow-md p-4 rounded">
        <h2 className="mt-4 text-xl sm:text-2xl font-extrabold border-b-2  mb-5">Customer Detail:</h2>

        <p className="font-bold text-black flex gap-2">
          <strong >Customer Name:</strong> {order.firstName} {order.lastName}
        </p>
        <p className="font-bold  ">
          <strong>Address:</strong> {order.address}, {order.city}, {order.zipCode}
        </p>
        <p className="font-bold text-black flex gap-2">
          <strong>Phone:</strong> {order.phone}
        </p>
        <p className="font-bold text-black flex gap-2">
          <strong>Email:</strong> {order.email}
        </p>
        <p className="font-bold text-black flex gap-2">
          <strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
        </p>
        <h2 className="mt-7 text-xl text-black sm:text-2xl font-extrabold border-b-2 mb-5">Product Detail:</h2>
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
                <p className="flex gap-2 font-bold text-black"> <strong>Item:</strong>{item.title}</p>

                <p className="flex gap-2 font-bold text-black"> <strong>Total Amount:</strong>${order.total}</p>
                <p className="flex gap-2 font-bold text-black"> <strong>Status:</strong>${order.status}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
