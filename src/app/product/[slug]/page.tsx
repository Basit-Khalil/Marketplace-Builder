'use client'

import { client } from "../../../sanity/lib/client";
import { Product } from "../../../../types/products";
import { groq } from "next-sanity";
import Image from "next/image";
import { urlFor } from "../../../sanity/lib/image"; 
import Header2 from "@/app/Components/Header2";
import SideBar from "@/app/Components/Side";
import buy from "../../../../Assets/buy.png";
import { useCart } from "@/app/Context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductPageProps {
  params: { slug: string }; // params as an object, no Promise
}

// Fetch product details by slug
async function getProduct(slug: string): Promise<Product | null> {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
      _id,
      productName,
      image,
      description,
      price
    }`,
    { slug }
  );
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const [product, setProduct] = useState<Product | null>(null); // Add state for product
  const router = useRouter();
  const { addItem } = useCart();

  useEffect(() => {
    // Fetch product data when component mounts
    const fetchProduct = async () => {
      const fetchedProduct = await getProduct(slug);
      setProduct(fetchedProduct);
    };
    fetchProduct();
  }, [slug]); // Only refetch if slug changes

  if (!product) {
    return <div>Product not found</div>; // Loading state
  }

  const handleAddToCart = () => {
    addItem({
      id: String(product._id), // Ensure _id is a string
      image: product.image ? urlFor(product.image).url() : "", // Convert image to string URL
      productName: product.productName,
      description: product.description, // Replace with actual detail if available
      quantity: 1,
      price: product.price, // Price should already be a number
    });
    router.push("/Bag");
  };

  return (
    <div>
      <Header2 />
      <div className="flex">
        <SideBar />
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between p-6 lg:p-12 max-w-6xl mx-auto">
          <div className="w-full lg:w-1/2 flex justify-center mb-6 lg:mb-0">
            {product.image && (
              <Image
                src={urlFor(product.image).url()} 
                alt={product.productName}
                className="rounded-md"
                width={400}
                height={400}
              />
            )}
          </div>
          <div className="w-full lg:w-1/2 flex flex-col space-y-4 text-center lg:text-left">
            <h1 className="text-2xl lg:text-4xl font-bold">{product.productName}</h1>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg lg:text-2xl font-semibold text-gray-800">
              ${product.price}
            </p>
            <button
              onClick={handleAddToCart}
              className="bg-black text-white flex items-center justify-center space-x-2 px-6 py-3 rounded-full hover:bg-gray-800 transition duration-300"
            >
              <Image src={buy} alt="Buy now" width={24} height={24} />
              <span>Add To Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
