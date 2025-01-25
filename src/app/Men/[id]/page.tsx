import { fetchProductById } from '../../../sanity/lib/sanity'; // Function to fetch product by ID
import { urlFor } from '../../../sanity/lib/sanity'; // Image URL builder
import Image from 'next/image';
import { notFound } from 'next/navigation'; // Used to render a "not found" page if the product doesn't exist

// Type for Product details
interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category: string;
  colors: string[];
  image?: any; // Image is now optional
}

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params; // Get the product ID from the URL

  let product: Product | null = null;
  try {
    product = await fetchProductById(id); // Fetch the product data by ID
  } catch (error) {
    console.error('Error fetching product:', error);
  }

  // If the product is not found, render a 404 page or an error message
  if (!product) {
    notFound(); // This automatically renders a 404 page
  }

  // Fallback image for when the product does not have an image
  const fallbackImage = '/placeholder.jpg';

  // Render product details if found
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">{product?.name}</h1>
      <div className="flex flex-col md:flex-row">
        {product?.image ? (
          <div className="md:w-1/2">
            <Image
              src={urlFor(product.image)?.toString() || fallbackImage} // Safe check for undefined image
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


