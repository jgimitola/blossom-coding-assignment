import { z } from 'zod';

const characterStatusSchema = z.enum(['alive', 'dead', 'unknown']);

export default characterStatusSchema;
