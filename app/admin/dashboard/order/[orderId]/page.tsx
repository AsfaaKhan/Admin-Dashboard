// app/dashboard/order/[orderId]/page.tsx
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
}:OrderPageProps) {
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
        <button className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
          Back to Dashboard
        </button>
      </Link>
      <h1 className="text-3xl font-bold mb-4">Order Details</h1>
      <div className="bg-white shadow p-4 rounded">
        <p>
          <strong>Customer:</strong> {order.firstName} {order.lastName}
        </p>
        <p>
          <strong>Address:</strong> {order.address}, {order.city}, {order.zipCode}
        </p>
        <p>
          <strong>Phone:</strong> {order.phone}
        </p>
        <p>
          <strong>Email:</strong> {order.email}
        </p>
        <p>
          <strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Total:</strong> ${order.total}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <h2 className="mt-4 text-xl font-semibold">Cart Items</h2>
        <ul>
          {order.cartItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2 my-2">
              <span>{item.title}</span>
              {item.imageUrl && (
                <Image
                  src={urlFor(item.imageUrl).url()}
                  alt={item.title}
                  width={50}
                  height={50}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
