"use client";

import { useState } from "react";
import { client } from "@/sanity/lib/client";
import Swal from "sweetalert2";
import Link from "next/link";

export default function AddProductPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Price can be either a number or an empty string (for initial/empty state)
  const [price, setPrice] = useState<number | "">("");
  // Store the asset reference (_id) of the uploaded image
  const [imageAssetRef, setImageAssetRef] = useState("");

  // This function is triggered when the file input changes
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    try {
      // Upload the file to Sanity. The first argument is the type ("image") and the second is the file.
      const uploadedAsset = await client.assets.upload("image", file);
      // Set the asset reference (_id) in state
      setImageAssetRef(uploadedAsset._id);
      Swal.fire("Uploaded!", "Image uploaded successfully", "success");
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire("Error", "Image upload failed", "error");
    }
  };

  // This function handles the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that all fields are filled in and an image has been uploaded
    if (!title|| !description || price === "" || !imageAssetRef) {
      Swal.fire("Error", "Please fill in all fields and upload an image", "error");
      return;
    }

    try {
      // Create a new product document, referencing the uploaded image asset
      const newProduct = {
        _type: "product",
        title,
        description,
        price: Number(price),
        imageUrl: {
          _type: "image",
          asset: {
            _ref: imageAssetRef,
          },
        },
      };

      // Create the product in Sanity
      await client.create(newProduct);
      Swal.fire("Success", "Product added successfully", "success");

      // Clear form fields after successful submission
      setTitle("");
      setDescription("");
      setPrice("");
      setImageAssetRef("");
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire("Error", "Failed to add product", "error");
    }
  };

  return (
    <div className="p-4">
      <Link href="./">
        <button className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
          Back to Dashboard
        </button>
      </Link>
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
          ></textarea>
        </div>
        <div>
          <label className="block font-semibold">Price</label>
          <input
            type="number"
            value={price === "" ? "" : price}
            onChange={(e) =>
              setPrice(e.target.value === "" ? "" : parseFloat(e.target.value))
            }
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
