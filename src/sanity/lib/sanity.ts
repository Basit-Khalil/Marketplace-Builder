import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'; // Add this import
import { Image } from '@sanity/types'; // Import the correct image type from @sanity/types

// Sanity client setup
export const client = sanityClient({
  projectId: 'fxeltr1j',
  dataset: 'production',
  useCdn: process.env.NODE_ENV === 'production',
});

// Define a Product interface to type the products correctly
interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category: string;
  colors: string[];
  inventory: number;
  status: string;
  image: Image; // Use the Image type for the image field
}

// Function to fetch all products
export async function fetchProducts(): Promise<Product[]> {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  return products;
}

// Create the image URL builder
const builder = imageUrlBuilder(client);

// Export the urlFor function with the correct image type
export const urlFor = (source: Image): string | undefined => {
  if (source) {
    return builder.image(source).url();
  }
  return undefined; // Return undefined if the source is invalid
};

// Function to fetch a product by its ID
export const fetchProductById = async (id: string): Promise<Product | null> => {
  const query = `*[_id == "${id}"][0]`; // Query to fetch a single product by ID
  const product: Product | null = await client.fetch(query);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};
