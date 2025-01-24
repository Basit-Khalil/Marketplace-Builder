/** 
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'; // Add this import


export const client = sanityClient({
  projectId: 'fxeltr1j', 
  dataset: 'production', 
  useCdn: process.env.NODE_ENV === 'production',
});

// Function to fetch all products
export async function fetchProducts() {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  return products;
}


// Create the image URL builder
const builder = imageUrlBuilder(client);

// Export the urlFor function
export const urlFor = (source) => builder.image(source);


export const fetchProductById = async (id: string) => {
  const query = `*[_id == "${id}"][0]`; // Query to fetch a single product by ID
  const product = await client.fetch(query);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

*/

import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'; // Add this import

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
  image: any; // You may want to refine this type based on your image data structure
}

// Function to fetch all products
export async function fetchProducts(): Promise<Product[]> {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  return products;
}

// Create the image URL builder
const builder = imageUrlBuilder(client);

// Export the urlFor function
export const urlFor = (source: any) => builder.image(source).url();

// Function to fetch a product by its ID
export const fetchProductById = async (id: string): Promise<Product | null> => {
  const query = `*[_id == "${id}"][0]`; // Query to fetch a single product by ID
  const product: Product | null = await client.fetch(query);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};
