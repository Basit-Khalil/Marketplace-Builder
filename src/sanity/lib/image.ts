/*import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}
 */
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../../sanity/lib/sanity'; // Assuming this is your Sanity client

const builder = imageUrlBuilder(client);

const urlFor = (source: any) => builder.image(source).url();
