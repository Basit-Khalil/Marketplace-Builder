import sanityClient from '@sanity/client';

// Configure Sanity client
const client = sanityClient({
  projectId: 'fxeltr1j', // replace with your Sanity project ID
  dataset: 'production',
  useCdn: true,
});

export async function fetchProducts() {
  const query = '*[_type == "product"]'; // Query to fetch all products
  const products = await client.fetch(query);
  return products;
}
