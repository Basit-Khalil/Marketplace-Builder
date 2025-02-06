'use client'; // Indicating this is a Client Component

import { client } from '../../sanity/lib/client';
import { allproducts } from '../../sanity/lib/queries';
import Link from 'next/link';
import Image from 'next/image';
import SideBar from '../Components/Side';
import React, { useEffect, useState } from 'react';
import { urlFor } from "../../sanity/lib/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category: string;
  colors: string[];
  inventory: number;
  status: string;
  image: string; // Image as a URL
  slug: { current: string }; // Ensure you have the slug type here
}

const ProductsPage = () => {
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      const fetchedProduct: Product[] = await client.fetch(allproducts);
      setProduct(fetchedProduct);
    }
    fetchProduct();
  }, []);

  return (
    <div className="flex">
      
      <SideBar />
      <div className="px-4 py-8">
        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.map((product) => (
            <li key={product._id}>
              <Link href={`/product/${product.slug.current}`}>
                {product.image && (
                  <Image
                    src={urlFor(product.image).url() || '/fallback-image.jpg'} // fallback image if product image is missing
                    alt="image"
                    className="rounded-md"
                    width={300}
                    height={300}
                  />
                )}
                <h1 className="text-[12px] text-[#9E3500] font-medium mt-2">{product.status}</h1>
                <h3 className="text-[12px] font-bold">{product.name}</h3>
                <p className="text-[#757575] text-[12px]">{product.category}</p>
                <p className="text-[#757575] text-[12px]">{product.colors.join(', ')}</p>
                <p className="text-black font-medium text-[10px] mt-1">${product.price}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsPage;




