import { z } from 'zod';

import characterDataSchema from './schemas/characterDataSchema';
import characterGenderSchema from './schemas/characterGenderSchema';
import characterStatusSchema from './schemas/characterStatusSchema';

export type CharacterData = z.infer<typeof characterDataSchema>;

export type CharacterStatus = z.infer<typeof characterStatusSchema>;

export type CharacterGender = z.infer<typeof characterGenderSchema>;
