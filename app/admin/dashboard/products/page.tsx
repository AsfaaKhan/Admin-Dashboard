"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/Product"; 

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    client
      .fetch<Product[]>(`
        *[_type == "product"]{
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
          category->{ title }
        }
      `)
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="p-4">
        <Link href="./">
        <button className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
          Back to Dashboard
        </button>
      </Link>
      <h1 className="text-2xl font-bold mb-4">All Products</h1> 
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-2 border border-gray-200 text-xs md:text-sm">
                Image
              </th>
              <th className="px-2 py-2 border border-gray-200 text-xs md:text-sm">
                Title
              </th>
              <th className="px-2 py-2 border border-gray-200 text-xs md:text-sm">
                Description
              </th>
              <th className="px-2 py-2 border border-gray-200 text-xs md:text-sm">
                Price
              </th>
              <th className="px-2 py-2 border border-gray-200 text-xs md:text-sm">
                Category
              </th>
              <th className="px-2 py-2 border border-gray-200 text-xs md:text-sm">
                Tags
              </th>
              <th className="px-2 py-2 border border-gray-200 text-xs md:text-sm">
                Inventory
              </th>
              <th className="px-2 py-2 border border-gray-200 text-xs md:text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-2 py-2 border border-gray-200">
                    {product.imageUrl && (
                      <Image
                        src={urlFor(product.imageUrl).url()}
                        alt={product.title}
                        width={80}
                        height={80}
                        className="object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-2 py-2 border border-gray-200 text-xs md:text-sm">
                    {product.title}
                  </td>
                  <td className="px-2 py-2 border border-gray-200 text-xs md:text-sm line-clamp-5">
                    {product.description}
                  </td>
                  <td className="px-2 py-2 border border-gray-200 text-xs md:text-sm">
                    ${product.price}
                  </td>
                  <td className="px-2 py-2 border border-gray-200 text-xs md:text-sm">
                    {product.category?.title || "N/A"}
                  </td>
                  <td className="px-2 py-2 border border-gray-200 text-xs md:text-sm">
                    {product.tags && product.tags.length > 0
                      ? product.tags.join(", ")
                      : "N/A"}
                  </td>
                  <td className="px-2 py-2 border border-gray-200 text-xs md:text-sm">
                    {product.inventory}
                  </td>
                  <td className="px-2 py-2 border border-gray-200 text-xs md:text-sm">
                    <Link href={`/dashboard/editProduct/${product._id}`}>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition">
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

