"use client";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ImBin2 } from "react-icons/im";
import { FaEye } from "react-icons/fa";
import Loader from "@/app/components/Loader";

// Define the interface for an order
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
  cartItems: {
    title: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [filter, setFilter] = useState("All");

  // Fetch orders from Sanity on component mount
  useEffect(() => {
    client
      .fetch(
        `*[_type == "order"]{
          _id, 
          firstName,
          lastName,
          address,
          city,
          zipCode,
          phone,
          email,
          total,
          discount,
          orderDate,
          status,
          _createdAt,
          cartItems[] -> { title, imageUrl }
        }`
      )
      .then((data: IOrder[]) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  // Filter orders based on the selected status
  const filterOrders =
    filter === "All" ? orders : orders.filter((order) => order.status === filter);

  // Delete an order from Sanity and update state
  const handleOrderDelete = async (orderId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await client.delete(orderId);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      Swal.fire("Deleted!", "Your order has been deleted!", "success");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error ) {
      Swal.fire("Error!", "Failed to delete order", "error", );
    }
  };

  // Update the order status in Sanity and update state
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await client.patch(orderId).set({ status: newStatus }).commit();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      if (newStatus === "dispatch") {
        Swal.fire("Order Dispatched", "Your order has been dispatched", "success");
      } else if (newStatus === "success") {
        Swal.fire("Success", "Your order has been completed", "success");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Swal.fire("Error", "Failed to change status", "error");
    }
  };



  // Loading Spinner
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  if (loading) {
    return <Loader />;
  }

  

  return (
    <ProtectedRoute>
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-700 text-white p-4 shadow-md flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
        <div>
        <h2 className="text-2xl font-bold ">Admin Dashboard</h2>

        </div>
        <div className="flex flex-wrap gap-2">
          {["All", "pending", "success", "dispatch"].map((status) => (
            <button
              key={status}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === status ? "bg-white text-red-600 font-bold" : "text-white border border-white"
              }`}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* Orders List */}
      <div className="flex-1 p-4 overflow-auto">
        <h2 className="text-xl font-bold text-center text-black   mb-4">Orders</h2>
        <div className="overflow-x-auto bg-white text-black rounded-lg shadow-md">
          <table className="min-w-max w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-black">
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 ">
              {filterOrders.map((order) => (
                <React.Fragment key={order._id}>
                  <tr
                    className="cursor-pointer hover:bg-gray-50 transition-all"
                  >
                    <td className="px-4 py-2 text-black">{order.firstName}</td>
                    <td className="px-4 py-2 text-black">{order.lastName}</td>
                    <td className="px-4 py-2 text-black truncate max-w-xs">{order.address}</td>
                    <td className="px-4 py-2 text-black ">{order.city}</td>
                    <td className="px-4 py-2 text-black">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2 text-black">${order.total}</td>
                    <td className="px-4 py-2 text-black">
                      <select
                        value={order.status || "pending"}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="bg-gray-100 p-1 w-full"
                      >
                        <option value="pending">Pending</option>
                        <option value="success">Success</option>
                        <option value="dispatch">Dispatch</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 flex flex-col md:flex-row gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOrderDelete(order._id);
                        }}
                        className="text-red-500  px-3 py-1 rounded hover:text-red-700 flex items-center  text-center transition"
                      >
                       <ImBin2 size={15} / >
                      </button>
                      <Link href={`./dashboard/order/${order._id}`}>
                        <button className="text-blue-500  px-3 py-1 rounded hover:text-blue-700 transition">
                          <FaEye size={15}/>
                        </button>
                      </Link>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    </ProtectedRoute>
  );
}

