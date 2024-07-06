import { z } from 'zod';

import lowerString from '@/shared/lib/lowerString';

import characterGenderSchema from './characterGenderSchema';
import characterStatusSchema from './characterStatusSchema';

const characterDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.preprocess((value) => lowerString(value), characterStatusSchema),
  species: z.string(),
  gender: z.preprocess((value) => lowerString(value), characterGenderSchema),
  image: z.string().url(),
});

export default characterDataSchema;
