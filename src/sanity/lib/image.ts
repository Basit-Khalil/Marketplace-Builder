/*
import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}
 
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../../sanity/lib/sanity'; // Assuming this is your Sanity client
import { Image } from '@sanity/types'; // Use the Image type from @sanity/types

const builder = imageUrlBuilder(client);

// Define the urlFor function with the correct image type
const urlFor = (source: Image): string | undefined => {
  if (source) {
    return builder.image(source).url(); // Return the URL for the image
  }
  return undefined; // Return undefined if the source is invalid
};

// Export the urlFor function for use elsewhere in your project
export { urlFor };

*/


import imageUrlBuilder from '@sanity/image-url';
import { client } from './client'; // Ensure this is correct

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
