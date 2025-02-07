"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Product } from "@/types/Product";
import { client } from "@/sanity/lib/client";

export default function EditProductPage() {
  const router = useRouter();
  const { _id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    tags: "",
    inventory: "",
  });

  useEffect(() => {
    if (_id) {
      client
        .fetch<Product>(`*[_type == "product" && _id == $id][0]`, { _id })
        .then((data) => {
          if (data) {
            setProduct(data);
            setFormData({
              title: data.title,
              description: data.description,
              price: data.price.toString(),
              category: data.category?.title || "",
              tags: data.tags?.join(", ") || "",
              inventory: data.inventory?.toString() || "",
            });
          }
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    if (!_id) return;
    
    try {
      await client.patch(_id).set({
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        inventory: parseInt(formData.inventory),
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      }).commit();

      alert("Product updated successfully!");
      router.push("/dashboard/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="p-6">
      <button onClick={() => router.back()} className="mb-4 bg-gray-500 text-white px-4 py-2 rounded">
        Back
      </button>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      {product ? (
        <div className="space-y-4">
          <label className="block">
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </label>

          <label className="block">
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </label>

          <label className="block">
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </label>

          <label className="block">
            Inventory:
            <input
              type="number"
              name="inventory"
              value={formData.inventory}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </label>

          <label className="block">
            Tags (comma separated):
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </label>

          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Update Product
          </button>
        </div>
      ) : (
        <p>Loading product...</p>
      )}
    </div>
  );
}
