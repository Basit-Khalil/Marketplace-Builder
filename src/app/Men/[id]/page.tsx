import { fetchProductById } from '../../../sanity/lib/sanity';
import { urlFor } from '../../../sanity/lib/sanity';
import Image from 'next/image';
import { notFound } from 'next/navigation'; // Use `notFound` for 404 pages
import { useParams } from 'next/navigation'; // Use the `useParams` hook to get dynamic route parameters
import { Image as SanityImage } from '@sanity/types';

// Define Product type as before
interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category: string;
  colors: string[];
  image?: SanityImage;
}

const ProductDetailPage = async () => {
  // Use the useParams hook to get the dynamic route parameters
  const params = useParams();
  const { id } = params; // Get the product ID from the URL

  let product: Product | null = null;
  try {
    product = await fetchProductById(id); // Fetch product details based on ID
  } catch (error) {
    console.error('Error fetching product:', error);
  }

  if (!product) {
    notFound(); // Render a 404 page if no product is found
  }

  const fallbackImage = '/placeholder.jpg';

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">{product?.name}</h1>
      <div className="flex flex-col md:flex-row">
        {product?.image ? (
          <div className="md:w-1/2">
            <Image
              src={urlFor(product.image)?.toString() || fallbackImage}
              alt={product?.name || 'Product Image'}
              width={500}
              height={500}
              className="rounded-md"
            />
          </div>
        ) : (
          <div className="md:w-1/2">
            <Image
              src={fallbackImage}
              alt="Placeholder Image"
              width={500}
              height={500}
              className="rounded-md"
            />
          </div>
        )}
        <div className="md:w-1/2 md:ml-6">
          <p className="text-lg">{product?.description || 'No description available'}</p>
          <p className="text-xl text-[#9E3500] font-semibold mt-4">${product?.price}</p>
          <p className="text-sm text-gray-600 mt-2">Category: {product?.category}</p>
          <p className="text-sm text-gray-600 mt-2">Colors: {product?.colors.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
