import { fetchProducts } from '../../sanity/lib/sanity';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../../sanity/lib/sanity';
import Link from 'next/link';
import SideBar from '../Components/Side';
import NextImage from 'next/image'; // Renamed to 'NextImage' to avoid conflict
import { Image as SanityImage } from '@sanity/types'; // Type-only import for Image from Sanity

// Initialize image URL builder
const builder = imageUrlBuilder(client);

// Function to generate image URL
export const urlFor = (source: SanityImage): string | undefined => {
  if (source) {
    return builder.image(source).url();
  }
  return undefined;
};

// Type definition for Product
interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category: string;
  colors: string[];
  inventory: number;
  status: string;
  image: SanityImage; // Use Sanity's Image type for the image field
}

// Type for page props that includes dynamic params (id)
interface PageProps {
  params: {
    id: string;
  };
}

const ProductsPage = async ({ params }: PageProps) => {
  // Fetch the products
  const products: Product[] = await fetchProducts();

  return (
    <div className='flex'>
      <SideBar />
      <div className="px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <li key={product._id}>
              <Link href={`/Product/${product._id}`} passHref>
                {product.image && (
                  <NextImage
                    src={urlFor(product.image) || '/placeholder.jpg'} // Handle fallback image
                    alt={product.name}
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
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
