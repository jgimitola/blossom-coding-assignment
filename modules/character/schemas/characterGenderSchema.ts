import { z } from 'zod';

const characterGenderSchema = z.enum([
  'female',
  'male',
  'genderless',
  'unknown',
]);

export default characterGenderSchema;
