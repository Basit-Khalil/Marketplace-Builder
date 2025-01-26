import { fetchProducts } from '../../sanity/lib/sanity';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../../sanity/lib/sanity';
import Link from 'next/link';
import SideBar from '../Components/Side';
import Image from 'next/image'; // Correct import for Next.js Image component
import { Image as SanityImage } from '@sanity/types'; // Type-only import for Image from Sanity

// Initialize image URL builder
const builder = imageUrlBuilder(client);

// Function to generate image URL
const urlFor = (source: SanityImage): string | undefined => {
  if (source && source.asset) {
    return builder.image(source).url(); // Ensure the asset exists before generating the URL
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

// ProductsPage component
const ProductsPage = async () => {
  // Fetch the products
  const products: Product[] = await fetchProducts();

  return (
    <div className='flex'>
      <SideBar />
      <div className="px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <li key={product._id} className="list-none"> {/* Added list-none for cleaner layout */}
              <Link href={`/Product/${product._id}`} passHref>
                <a> {/* Added anchor tag for proper link behavior */}
                  {product.image && (
                    <Image
                      src={urlFor(product.image) || '/placeholder.jpg'} // Fallback to placeholder if no image is available
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
                </a>
              </Link>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;


