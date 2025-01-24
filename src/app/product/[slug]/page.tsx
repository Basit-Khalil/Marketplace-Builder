import { client } from '../../../sanity/lib/client';
import { Product } from "../../../../types/products";
import { groq } from "next-sanity";
import Image from 'next/image'; // Ensure Image is imported
import { urlFor } from "../../../sanity/lib/sanity"; // Ensure urlFor is imported
import Header2 from '@/app/Components/Header2';
import SideBar from '@/app/Components/Side';

interface ProductPageProps {
  params: { slug: string }; // Assuming `params` is directly passed as an object
}

async function getProduct(slug: string): Promise<Product | null> {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
      _id,
      productName,
      _type,
      image,
      price,
    }`,
    { slug }
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params; // Destructure `slug` from params
  const product = await getProduct(slug); // Pass `slug` to the function

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Header2 />
      <div className="flex">
        <SideBar />
        <div className="px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.image && (
              <Image
                src={urlFor(product.image).toString()}
                alt={product.productName}
                className="rounded-md"
                width={300}
                height={300}
              />
            )}
            <h1 className="text-[12px] text-[#9E3500] font-medium mt-2">{product.productName}</h1>
            <h3 className="text-[12px] font-bold">{product.productName}</h3>
            <p className="text-[#757575] text-[12px]">{product._type}</p>
            <p className="text-[#757575] text-[12px]">{product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
